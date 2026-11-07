// Summarise a judged run: scores, rankings and source use per condition, then per question, then
// what the judges wished the answers had found.
//
//   node summarize.mjs --run=<runId>
//
// Prints Markdown and writes runs/<runId>/summary.md.
import { writeFileSync } from "node:fs";
import { join } from "node:path";
import {
  latestAnswers,
  loadRunMeta,
  parseArgs,
  parseCondition,
  RUBRIC,
  readJsonl,
  runsDir,
  sortConditions,
} from "./lib.mjs";

const args = parseArgs(process.argv.slice(2));
if (!args.run) throw new Error("--run=<runId> is required");
const runDir = join(runsDir(args), args.run);
const meta = loadRunMeta(runDir);

const answers = Object.fromEntries(latestAnswers(runDir).map((a) => [a.key, a]));
const scores = new Map();
for (const s of readJsonl(join(runDir, "scores.jsonl"))) if (s.scores) scores.set(s.key, s);
const rows = [...scores.values()]
  .filter((s) => answers[s.key])
  .map((s) => ({ ...answers[s.key], ...s }));
const ranks = readJsonl(join(runDir, "ranks.jsonl")).filter((r) => r.ranking);

const mean = (xs) => (xs.length ? xs.reduce((a, b) => a + b, 0) / xs.length : null);
const fmt = (x, d = 2) => (x == null ? "-" : x.toFixed(d));
const nums = (xs) => xs.filter((v) => typeof v === "number");
const totalItems = RUBRIC.filter((i) => i.inTotal);
function total(s) {
  const got = totalItems.reduce(
    (a, i) => a + (typeof s.scores[i.key] === "number" ? s.scores[i.key] : 0),
    0,
  );
  return got / totalItems.reduce((a, i) => a + i.max, 0);
}
/** Mean rank (1 = best) of a condition among the groups it appears in. */
function meanRank(cond, rs = ranks) {
  return mean(rs.map((r) => r.ranking.indexOf(cond) + 1).filter((n) => n > 0));
}
const conds = sortConditions(new Set(rows.map((r) => r.cond)));
const outOfTotal = RUBRIC.filter((i) => !i.inTotal).map((i) => i.key);

const lines = [
  `# Playbook eval ${args.run}`,
  "",
  `Playbook skill \`${meta.config.skillName}\`, language ${meta.config.lang}, model ${meta.model}. ${rows.length} judged answers, ${ranks.length} ranked groups. total = sum of every item except ${outOfTotal.join(" and ")}, scaled to 0-1. rank = mean place in the blind side-by-side ranking (1 = best).`,
  "",
  "## By condition",
  "",
  `| cond | n | total | rank | ${RUBRIC.map((i) => `${i.key} /${i.max}`).join(" | ")} | invented | used skill | used MCP | leaks | tokens | sec |`,
  `|---|---|---|---|${RUBRIC.map(() => "---").join("|")}|---|---|---|---|---|---|`,
];
for (const c of conds) {
  const rs = rows.filter((r) => r.cond === c);
  const per = RUBRIC.map((i) => fmt(mean(nums(rs.map((r) => r.scores[i.key])))));
  lines.push(
    `| ${c} ${parseCondition(c).label} | ${rs.length} | ${fmt(mean(rs.map(total)))} | ${fmt(meanRank(c))} | ${per.join(" | ")} | ${rs.reduce((a, r) => a + (r.scores.invented?.length ?? 0), 0)} | ${rs.filter((r) => r.usedSkill).length}/${rs.length} | ${rs.filter((r) => r.usedGameGene).length}/${rs.length} | ${rs.filter((r) => r.leaks.length).length} | ${Math.round(mean(rs.map((r) => r.tokens)))} | ${Math.round(mean(rs.map((r) => r.durationMs)) / 1000)} |`,
  );
}

lines.push("", "## By question: total / rank", "");
lines.push(`| question | ${conds.join(" | ")} | best precedent (most votes) |`);
lines.push(`|---|${conds.map(() => "---").join("|")}|---|`);
for (const qid of [...new Set(rows.map((r) => r.qid))].sort()) {
  const qRanks = ranks.filter((r) => r.qid === qid);
  const cells = conds.map((c) => {
    const t = mean(rows.filter((r) => r.qid === qid && r.cond === c).map(total));
    return `${fmt(t)} / ${fmt(meanRank(c, qRanks), 1)}`;
  });
  const votes = new Map();
  for (const r of qRanks)
    if (r.bestPrecedent) votes.set(r.bestPrecedent, (votes.get(r.bestPrecedent) ?? 0) + 1);
  const best = [...votes.entries()].sort((a, b) => b[1] - a[1])[0];
  lines.push(`| ${qid} | ${cells.join(" | ")} | ${best ? `${best[0]} (${best[1]})` : "-"} |`);
}

lines.push("", "## What the judges wished the answers had found", "");
for (const qid of [...new Set(ranks.map((r) => r.qid))].sort()) {
  const wished = ranks.filter((r) => r.qid === qid).flatMap((r) => r.wishedPrecedents ?? []);
  if (wished.length) lines.push(`- **${qid}**`, ...wished.map((w) => `  - ${w}`));
}

const invented = rows.filter((r) => r.scores.invented?.length);
if (invented.length) {
  lines.push("", "## Flagged as invented", "");
  for (const r of invented) lines.push(`- ${r.key}: ${r.scores.invented.join("; ")}`);
}
const leaked = rows.filter((r) => r.leaks.length);
if (leaked.length) {
  lines.push("", "## Leaks (used a source the condition should lack, or read the eval folder)", "");
  for (const r of leaked) lines.push(`- ${r.key}: ${r.leaks.join(", ")}`);
}

const md = `${lines.join("\n")}\n`;
writeFileSync(join(runDir, "summary.md"), md);
console.log(md);
