// Rank the answers to the same question (one per condition, same rep) side by side, blind.
//
//   node rank.mjs --run=<runId> [--model=opus] [--concurrency=3]
//
// Absolute scores bunch up at the top; a side-by-side ranking separates them. The judge also
// names the precedents it wished an answer had found, which is where the playbook or GameGene
// can improve. Answers are shuffled (seeded by question and rep) and source names are masked.
// Writes runs/<runId>/ranks.jsonl (one line per question x rep; re-running skips done groups).
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
  readJsonl,
  removeJudgeWorkspace,
  runsDir,
} from "./lib.mjs";

const args = parseArgs(process.argv.slice(2));
if (!args.run) throw new Error("--run=<runId> is required");
const runDir = join(runsDir(args), args.run);
const cfg = loadRunMeta(runDir).config;
const concurrency = Number(args.concurrency ?? 3);
const questions = Object.fromEntries(loadQuestions(cfg).map((q) => [q.id, q]));
// Enough labels for every base condition plus a few variants.
const LABELS = ["P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

/** Deterministic shuffle so a re-run shows the judge the same order. */
function shuffled(items, seedText) {
  let seed = [...seedText].reduce((h, ch) => (h * 31 + ch.charCodeAt(0)) >>> 0, 7);
  const rand = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 2 ** 32;
  };
  const out = [...items];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

function rankPrompt(q, labelled) {
  const blocks = labelled
    .map(({ label, answer }) => `=== ANSWER ${label} ===\n${maskSources(cfg, answer)}`)
    .join("\n\n");
  const labels = labelled.map((l) => l.label);
  return `A game developer asked the design question below. ${labelled.length} assistants answered. Rank the answers from most to least useful to this developer for making the decision. Weigh: precedents from shipped games that truly fit (same decision or mechanism beats a loose analogy), what those developers gave up, whether precedents actually shape the recommendation, honesty about what is not known, and how well the answer addresses the situation the developer described. Length and polish do not count. Knowledge-source names are masked as [source] and record URLs as [record link]. Do not use tools.

QUESTION:
${promptOf(q, cfg.lang)}

${blocks}

Reply with one JSON object and nothing else:
{"ranking":${JSON.stringify(labels)} reordered best first,
 "reasons":{${labels.map((l) => `"${l}":"one sentence"`).join(",")}},
 "bestPrecedent":"the single most useful precedent cited by any answer, as 'game - person', or null",
 "wishedPrecedents":["a precedent or kind of evidence none of the answers had that would have helped decide this (name a real game if you know one fits; otherwise describe what is missing)"],
 "note":"one sentence on what separated the best answer from the rest"}`;
}

const ranksPath = join(runDir, "ranks.jsonl");
const done = new Set(
  readJsonl(ranksPath)
    .filter((r) => r.ranking)
    .map((r) => r.group),
);
const groups = new Map();
for (const a of latestAnswers(runDir)) {
  const group = `${a.qid}__r${a.rep}`;
  if (!groups.has(group)) groups.set(group, []);
  groups.get(group).push(a);
}
const todo = [...groups.entries()].filter(([g, as]) => !done.has(g) && as.length >= 2);
for (const [g, as] of todo)
  if (as.length > LABELS.length)
    throw new Error(`${g}: ${as.length} answers, at most ${LABELS.length} can be ranked together`);
console.log(`ranking ${todo.length} groups in ${args.run}`);

await pool(todo, concurrency, async ([group, answers]) => {
  const order = shuffled(
    answers.sort((a, b) => a.cond.localeCompare(b.cond)),
    group,
  );
  const labelled = order.map((a, i) => ({ label: LABELS[i], cond: a.cond, answer: a.answer }));
  const { json, error } = await askJudge(
    cfg,
    args.run,
    rankPrompt(questions[answers[0].qid], labelled),
    args.model,
  );
  const condOf = Object.fromEntries(labelled.map((l) => [l.label, l.cond]));
  const ranking = json?.ranking?.map((l) => condOf[l]).filter(Boolean) ?? null;
  const row = {
    group,
    qid: answers[0].qid,
    rep: answers[0].rep,
    labels: condOf,
    ranking,
    reasons: json
      ? Object.fromEntries(Object.entries(json.reasons ?? {}).map(([l, r]) => [condOf[l] ?? l, r]))
      : null,
    bestPrecedent: json?.bestPrecedent ?? null,
    wishedPrecedents: json?.wishedPrecedents ?? [],
    note: json?.note ?? null,
    error,
  };
  appendFileSync(ranksPath, `${JSON.stringify(row)}\n`);
  console.log(`${group}: ${ranking ? ranking.join(" > ") : `ERROR ${String(error).slice(0, 80)}`}`);
});
removeJudgeWorkspace(args.run);
console.log(`ranks: ${ranksPath}`);
