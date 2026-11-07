// Score each answer of a run against the rubric with a headless `claude -p` judge.
//
//   node judge.mjs --run=<runId> [--model=opus] [--concurrency=3]
//
// The judge gets the question, the gold notes, and the playbook reference files for the gold
// questions, so it can check what an answer attributes to the playbook. It has no tools, no skill
// and no MCP, and source names in the answer are masked. Writes runs/<runId>/scores.jsonl (one
// line per answer; re-running skips scored keys).
import { appendFileSync } from "node:fs";
import { join } from "node:path";
import {
  askJudge,
  latestAnswers,
  loadQuestions,
  loadRunMeta,
  maskSources,
  parseArgs,
  pool,
  promptOf,
  RUBRIC,
  readJsonl,
  referencesFor,
  removeJudgeWorkspace,
  runsDir,
} from "./lib.mjs";

const args = parseArgs(process.argv.slice(2));
if (!args.run) throw new Error("--run=<runId> is required");
const runDir = join(runsDir(args), args.run);
const cfg = loadRunMeta(runDir).config;
const concurrency = Number(args.concurrency ?? 3);
const questions = Object.fromEntries(loadQuestions(cfg).map((q) => [q.id, q]));

function judgePrompt(q, answer) {
  const rubric = RUBRIC.map(
    (item) =>
      `- ${item.key} (0-${item.max}):\n${item.levels.map((l, i) => `    ${i} = ${l}`).join("\n")}`,
  ).join("\n");
  const keys = RUBRIC.map((i) => `"${i.key}":n`).join(",");
  return `You are grading an AI assistant's answer to a game developer's design question. Grade strictly, only from the material below, and give the top level only when its description is fully met. Do not use tools.

Names of the assistant's knowledge sources are masked as [source] and record URLs as [record link]; judge the content, not the source.

RUBRIC (use exactly these levels):
${rubric}

Also list in "invented" any precedent the answer presents as a real developer decision that (a) it attributes to the reference files below but that does not appear in them, or (b) looks fabricated or misattributed by your own knowledge. A case with a [record link] that is not in the reference files may come from a database you cannot see: list it only if it contradicts what you know. Leave the list empty when unsure.

QUESTION (from the developer):
${promptOf(q, cfg.lang)}

GOLD NOTES:
goldCases: ${JSON.stringify(q.goldCases)}
expectGap: ${JSON.stringify(q.expectGap)}

REFERENCE FILES FOR THE GOLD QUESTIONS:
${referencesFor(cfg, q.goldQuestions) || "(none: this is a control question with no matching reference)"}

ANSWER TO GRADE:
<<<
${maskSources(cfg, answer)}
>>>

Reply with one JSON object and nothing else:
{${keys},"invented":["..."],"precedentsCited":["game - person"],"note":"one sentence"}`;
}

const scoresPath = join(runDir, "scores.jsonl");
const scored = new Set(
  readJsonl(scoresPath)
    .filter((s) => s.scores)
    .map((s) => s.key),
);
const todo = latestAnswers(runDir).filter((a) => !scored.has(a.key));
console.log(`judging ${todo.length} answers in ${args.run}`);
await pool(todo, concurrency, async (a) => {
  const { json, error } = await askJudge(
    cfg,
    args.run,
    judgePrompt(questions[a.qid], a.answer),
    args.model,
  );
  const row = { key: a.key, qid: a.qid, cond: a.cond, rep: a.rep, scores: json, error };
  appendFileSync(scoresPath, `${JSON.stringify(row)}\n`);
  console.log(
    `${a.key}: ${json ? RUBRIC.map((i) => `${i.key}=${json[i.key]}`).join(" ") : `ERROR ${error.slice(0, 80)}`}`,
  );
});
removeJudgeWorkspace(args.run);
console.log(`scores: ${scoresPath}`);
