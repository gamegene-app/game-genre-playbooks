// Answer each question under each condition with headless `claude -p`, and record what was used.
//
//   node run.mjs --conditions=A,B,C,D --reps=3   (add --questions-file=questions/horror.json or questions/cozy.json for those genres)
//   node run.mjs --questions=Q01,Q02 --conditions=A,A-trial --run=trial1
//
// Each condition answers from its own empty temp folder that holds only its playbook skill (or
// nothing), so the answer cannot lean on any project files. Writes runs/<runId>/meta.json,
// runs/<runId>/raw/<qid>__<cond>__r<n>.jsonl (stream-json transcript) and one line per answer in
// runs/<runId>/answers.jsonl. Re-running with the same --run skips answers already there.
import { appendFileSync, existsSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import {
  answerPrompt,
  teamOf,
  conditionArgs,
  latestAnswers,
  loadQuestions,
  loadRunMeta,
  parseArgs,
  parseCondition,
  parseStream,
  pool,
  prepareWorkspace,
  readJsonl,
  removeWorkspaces,
  resolveConfig,
  runClaude,
  runsDir,
  toolSummary,
} from "./lib.mjs";

const args = parseArgs(process.argv.slice(2));
const RUNS = runsDir(args);
const runId = args.run ?? new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
const runDir = join(RUNS, runId);
// A resumed run keeps its config (playbook, questions file, language) unless flags override it.
const prior = existsSync(join(runDir, "meta.json")) ? loadRunMeta(runDir).config : {};
const cfg = resolveConfig({
  "questions-file": prior.questionsFile,
  playbook: prior.playbookDir,
  skill: prior.skillName,
  lang: prior.lang,
  "variants-dir": prior.variantsDir,
  ...args,
});

const all = loadQuestions(cfg);
const qids = args.questions ? args.questions.split(",") : null;
const questions = (qids ?? all.map((q) => q.id)).map((id) => {
  const q = all.find((x) => x.id === id || x.id.startsWith(`${id}-`));
  if (!q) throw new Error(`unknown question ${id}`);
  return q;
});
const conds = (args.conditions ?? "A,B,C,D").split(",");
for (const c of conds) parseCondition(c);
const reps = Number(args.reps ?? 1);
const concurrency = Number(args.concurrency ?? 3);
const modelArgs = args.model ? ["--model", args.model] : [];

mkdirSync(join(runDir, "raw"), { recursive: true });
const answersPath = join(runDir, "answers.jsonl");

// --reuse=<runId>:A,B copies those conditions' answers (for the selected questions and reps) and
// their scores from an earlier run, so a new variant can be ranked against them without answering
// them again. Add --rejudge to copy only the answers, e.g. after changing the rubric.
if (args.reuse) {
  const [fromRun, condList] = args.reuse.split(":");
  const keep = new Set(condList.split(","));
  const wantQ = new Set(questions.map((q) => q.id));
  const have = new Set(readJsonl(answersPath).map((r) => r.key));
  const fromDir = join(RUNS, fromRun);
  const reused = latestAnswers(fromDir).filter(
    (r) => keep.has(r.cond) && wantQ.has(r.qid) && r.rep <= reps && !have.has(r.key),
  );
  for (const r of reused)
    appendFileSync(answersPath, `${JSON.stringify({ ...r, reusedFrom: fromRun })}\n`);
  const keys = new Set(reused.map((r) => r.key));
  const scoresToCopy = args.rejudge
    ? []
    : readJsonl(join(fromDir, "scores.jsonl")).filter((s) => s.scores && keys.has(s.key));
  for (const s of scoresToCopy)
    appendFileSync(
      join(runDir, "scores.jsonl"),
      `${JSON.stringify({ ...s, reusedFrom: fromRun })}\n`,
    );
  console.log(`reused ${reused.length} answers from ${fromRun}`);
}

const done = new Set(
  readJsonl(answersPath)
    .filter((r) => !r.error)
    .map((r) => r.key),
);
const jobs = [];
for (let r = 1; r <= reps; r++)
  for (const q of questions)
    for (const cond of conds) {
      const key = `${q.id}__${cond}__r${r}`;
      if (!done.has(key)) jobs.push({ q, cond, rep: r, key });
    }

writeFileSync(
  join(runDir, "meta.json"),
  JSON.stringify(
    {
      runId,
      config: cfg,
      questions: questions.map((q) => q.id),
      conditions: conds,
      reps,
      model: args.model ?? "default",
    },
    null,
    2,
  ),
);
console.log(
  `run ${runId}: ${jobs.length} jobs (${done.size} already done), concurrency ${concurrency}\n` +
    `  playbook ${cfg.playbookDir} as skill "${cfg.skillName}", lang ${cfg.lang}`,
);

const workspaces = Object.fromEntries(conds.map((c) => [c, prepareWorkspace(cfg, runId, c)]));
const cleanup = () => {
  if (!args["keep-workspaces"]) removeWorkspaces(runId);
};
process.on("SIGINT", () => {
  cleanup();
  process.exit(130);
});
try {
  await pool(jobs, concurrency, answerOne);
} finally {
  cleanup();
}
console.log(`answers: ${answersPath}`);

async function answerOne({ q, cond, rep, key }) {
  const started = Date.now();
  const { code, stdout, stderr } = await runClaude(
    answerPrompt(q, cfg.lang, teamOf(cfg)),
    ["--output-format", "stream-json", "--verbose", ...modelArgs, ...conditionArgs(cfg, cond)],
    { cwd: workspaces[cond] },
  );
  writeFileSync(join(runDir, "raw", `${key}.jsonl`), stdout);
  const { tools, result, tokens } = parseStream(stdout);
  const answer = result?.result ?? "";
  const error =
    code !== 0 || !result || result.is_error ? (result?.result ?? stderr.slice(0, 500)) : null;
  const row = {
    key,
    qid: q.id,
    cond,
    rep,
    answer,
    error,
    tokens,
    costUsd: result?.total_cost_usd ?? null,
    durationMs: Date.now() - started,
    numTurns: result?.num_turns ?? null,
    ...toolSummary(cfg, tools, cond),
  };
  appendFileSync(answersPath, `${JSON.stringify(row)}\n`);
  const flag = error
    ? `ERROR ${String(error).slice(0, 80)}`
    : row.leaks.length
      ? `LEAK ${row.leaks}`
      : "ok";
  console.log(
    `${key}: ${flag} skill=${row.usedSkill} mcp=${row.usedGameGene} mcpFailed=${row.mcpFailed} tokens=${tokens} ${Math.round(row.durationMs / 1000)}s`,
  );
}
