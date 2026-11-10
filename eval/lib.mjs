// Shared helpers for the playbook eval: config, conditions, workspaces, and running `claude -p`.
import { spawn } from "node:child_process";
import {
  cpSync,
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { homedir, tmpdir } from "node:os";
import { dirname, isAbsolute, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

export const KIT_DIR = dirname(fileURLToPath(import.meta.url));
export const DEFAULT_RUNS_DIR = join(KIT_DIR, "runs");

export function parseArgs(argv) {
  const out = {};
  for (const a of argv) {
    const m = a.match(/^--([^=]+)(?:=(.*))?$/);
    if (m) out[m[1]] = m[2] ?? "true";
  }
  return out;
}

const abs = (p) => (isAbsolute(p) ? p : resolve(process.cwd(), p));

/** The skill name in a SKILL.md frontmatter (`name: ...`), or null. */
function skillNameOf(skillMd) {
  if (!existsSync(skillMd)) return null;
  return readFileSync(skillMd, "utf8").match(/^name:\s*(.+?)\s*$/m)?.[1] ?? null;
}

/**
 * Resolve the eval config for a new run from CLI flags and env:
 *   --questions-file  questions file (default questions/roguelite.json; questions/horror.json, questions/cozy.json)
 *   --playbook   playbook folder holding SKILL.md + references/ (env PLAYBOOK_DIR;
 *                default <kit>/../skills/<playbook> from the questions file, or <genre> for
 *                older files)
 *   --skill      skill name to install it as (default: the name in its SKILL.md)
 *   --lang       ja | en: which prompt text to ask (default ja)
 *   --runs-dir   where runs are written (default <kit>/runs)
 */
export function resolveConfig(args) {
  const questionsFile = abs(args["questions-file"] ?? join(KIT_DIR, "questions", "roguelite.json"));
  const qdoc = JSON.parse(readFileSync(questionsFile, "utf8"));
  const playbookDir = abs(
    args.playbook ??
      process.env.PLAYBOOK_DIR ??
      join(KIT_DIR, "..", "skills", qdoc.playbook ?? qdoc.genre ?? ""),
  );
  if (!existsSync(join(playbookDir, "SKILL.md")))
    throw new Error(`no SKILL.md in ${playbookDir}: pass --playbook=<folder> or set PLAYBOOK_DIR`);
  const skillName = args.skill ?? skillNameOf(join(playbookDir, "SKILL.md"));
  if (!skillName) throw new Error("SKILL.md has no `name:`; pass --skill=<name>");
  const lang = args.lang ?? "ja";
  if (!["ja", "en"].includes(lang)) throw new Error(`--lang must be ja or en, not ${lang}`);
  return {
    questionsFile,
    playbookDir,
    skillName,
    lang,
    variantsDir: abs(args["variants-dir"] ?? join(KIT_DIR, "variants")),
    // Only condition G reads it; checked when its workspace is built, so other runs need nothing.
    studiosDir:
      (args["game-studios"] ?? process.env.GAME_STUDIOS_DIR)
        ? abs(args["game-studios"] ?? process.env.GAME_STUDIOS_DIR)
        : null,
  };
}

export function runsDir(args) {
  return abs(args["runs-dir"] ?? DEFAULT_RUNS_DIR);
}

/** Config of an existing run (written by run.mjs to meta.json). */
export function loadRunMeta(runDir) {
  const p = join(runDir, "meta.json");
  if (!existsSync(p)) throw new Error(`no meta.json in ${runDir}: run run.mjs first`);
  return JSON.parse(readFileSync(p, "utf8"));
}

export function loadQuestions(cfg) {
  return JSON.parse(readFileSync(cfg.questionsFile, "utf8")).questions;
}

/** The prompt text of a question in the run's language. */
export const promptOf = (q, lang) => q.prompt[lang] ?? q.prompt.en ?? q.prompt.ja;

// Tools no condition may use: web access would bypass both knowledge sources, edits and shells
// are out of scope for a design answer, and subagents would hide what was read.
const COMMON_DISALLOWED = [
  "Bash",
  "PowerShell",
  "Edit",
  "Write",
  "NotebookEdit",
  "WebSearch",
  "WebFetch",
  "Agent",
  "Workflow",
  "Artifact",
];

// Read-only tools every condition may use without a prompt. Headless runs cannot answer a
// permission prompt, and an unapproved MCP call fails with "you haven't granted it yet".
const COMMON_ALLOWED = ["Read", "Grep", "Glob", "Skill", "ToolSearch"];

// GameGene is a claude.ai connector, so disableClaudeAiConnectors turns it off. In `claude -p` its
// servers are named claude_ai_<connector name>; override with GAMEGENE_SERVERS (comma-separated)
// if the connectors are named differently. If GameGene is added through .mcp.json instead, the
// no-MCP conditions must also disallow that server's tools.
export const GAMEGENE_SERVERS = (
  process.env.GAMEGENE_SERVERS ?? "mcp__claude_ai_GameGene,mcp__claude_ai_GameGeneStg"
).split(",");

// The four base conditions. Append -<variant> to a skill condition (A-trial, B-trial) to use a trial
// SKILL.md from variants/<variant>/ in place of the playbook's own.
// W and G are the comparisons a reader asks about first: W is Claude with web search (the real
// alternative to any knowledge skill), G is Claude-Code-Game-Studios, the most-starred game-dev
// kit for Claude Code, which ships genre sheets since its 1.3.0 (9 Nov 2026).
export const BASE_CONDITIONS = {
  A: { label: "skill only", skill: true, mcp: false },
  B: { label: "skill + MCP", skill: true, mcp: true },
  C: { label: "MCP only", skill: false, mcp: true },
  D: { label: "neither", skill: false, mcp: false },
  W: { label: "web search", skill: false, mcp: false, web: true },
  // A developer who installs the playbook still has web search; V is that everyday setup.
  V: { label: "skill + web search", skill: true, mcp: false, web: true },
  G: { label: "Claude-Code-Game-Studios", skill: false, mcp: false, studios: true },
};

/** Parse a condition key like "A" or "B-v3a". */
export function parseCondition(key) {
  const m = String(key).match(/^([A-DWGV])(?:-([\w.-]+))?$/);
  if (!m) throw new Error(`unknown condition ${key} (use A, B, C, D, W, V, G, or A-<variant>)`);
  const base = BASE_CONDITIONS[m[1]];
  const variant = m[2] ?? null;
  if (variant && !base.skill) throw new Error(`condition ${key}: ${m[1]} has no skill to vary`);
  return { ...base, key, variant, label: variant ? `${base.label} (${variant})` : base.label };
}

/** Order condition keys A, A-v2, B, ... for tables. */
export const sortConditions = (keys) => [...keys].sort((a, b) => a.localeCompare(b));

/** A path as a permission rule matches it: POSIX, with a Windows drive as /c/... */
function permPath(p) {
  const posix = resolve(p).replaceAll("\\", "/");
  const m = posix.match(/^([A-Za-z]):(.*)$/);
  return m ? `/${m[1].toLowerCase()}${m[2]}` : posix;
}
/** Deny Read (which also covers Grep and Glob) under an absolute folder. */
const denyRead = (dir) => `Read(/${permPath(dir)}/**)`;

/** Lower-case forward-slash form, for comparing tool paths. */
const norm = (p) =>
  String(p ?? "")
    .replaceAll("\\", "/")
    .toLowerCase();

/**
 * Build an empty project folder for one condition: nothing but the playbook skill (or a variant
 * of it) for the skill conditions, nothing at all for the others. Each condition has its own
 * folder, so a skill-off condition cannot find the playbook by searching the project.
 */
export function prepareWorkspace(cfg, runId, condKey) {
  const c = parseCondition(condKey);
  const dir = join(tmpdir(), "playbook-eval", runId, condKey);
  rmSync(dir, { recursive: true, force: true });
  mkdirSync(dir, { recursive: true });
  if (c.skill) {
    const dest = join(dir, ".claude", "skills", cfg.skillName);
    cpSync(cfg.playbookDir, dest, { recursive: true });
    if (c.variant) {
      const src = join(cfg.variantsDir, c.variant, "SKILL.md");
      if (!existsSync(src)) throw new Error(`variant ${c.variant}: no ${src}`);
      const text = readFileSync(src, "utf8").replace(/^name: .*$/m, `name: ${cfg.skillName}`);
      writeFileSync(join(dest, "SKILL.md"), text);
    }
  }
  if (c.studios) {
    const src = cfg.studiosDir;
    if (!src || !existsSync(join(src, ".claude", "agents")))
      throw new Error(
        "condition G: pass --game-studios=<clone of Donchitos/Claude-Code-Game-Studios> or set GAME_STUDIOS_DIR",
      );
    // The kit's agents, skills, genre sheets, rules, docs and CLAUDE.md, as a project using it
    // would have them. Its settings.json is left out: it wires shell hooks and a status line,
    // which a design answer does not need and which would run third-party scripts.
    const skip = new Set([".git", join(".claude", "settings.json"), join(".claude", "hooks")]);
    cpSync(src, dir, {
      recursive: true,
      filter: (p) => !skip.has(relative(src, p)),
    });
  }
  return dir;
}

/** An empty folder for the judges (no skills, no project files). */
export function judgeWorkspace(runId) {
  const dir = join(tmpdir(), "playbook-eval", runId, "_judge");
  mkdirSync(dir, { recursive: true });
  return dir;
}

export function removeJudgeWorkspace(runId) {
  rmSync(join(tmpdir(), "playbook-eval", runId, "_judge"), { recursive: true, force: true });
}

export function removeWorkspaces(runId) {
  rmSync(join(tmpdir(), "playbook-eval", runId), { recursive: true, force: true });
}

/** Launch flags for answering under one condition. */
export function conditionArgs(cfg, condKey) {
  const c = parseCondition(condKey);
  // Every condition: the kit folder holds the gold notes and earlier answers, and the playbook's
  // source folder would let a skill-off condition read it by absolute path.
  const deny = [denyRead(KIT_DIR), denyRead(cfg.playbookDir)];
  // Run compare-1110 leaked once: a skill-off answer searched the user's Claude memory, found the
  // path of another clone of this repo there, and read the playbook from it. Every condition is
  // kept out of the memory folders, and a skill-off condition out of any copy of the playbook.
  const claudeHome = join(homedir(), ".claude");
  deny.push(denyRead(join(claudeHome, "projects")), denyRead(join(claudeHome, "insights")));
  if (!c.skill) deny.push(`Read(//**/skills/${cfg.skillName}/**)`);
  const settings = { permissions: { deny } };
  // A copy of the playbook installed at user level or as a plugin would otherwise still show up.
  if (!c.skill) settings.skillOverrides = { [cfg.skillName]: "off" };
  if (!c.mcp) settings.disableClaudeAiConnectors = true;
  // W gets the web; G gets subagents, since Game Studios works through its own agents.
  const extra = [
    ...(c.mcp ? GAMEGENE_SERVERS : []),
    ...(c.web ? ["WebSearch", "WebFetch"] : []),
    ...(c.studios ? ["Agent"] : []),
  ];
  const allowed = [...COMMON_ALLOWED, ...extra];
  const disallowed = COMMON_DISALLOWED.filter((t) => !extra.includes(t));
  // Left to itself, the model answered W and G from memory (smoke run, 10 Nov 2026: no search,
  // no genre sheet opened), which would make them stand-ins for D. Both get told to use what
  // they have, so the comparison is against each alternative at its best, not at its laziest.
  const nudge = c.web
    ? "Before answering, search the web for shipped games that faced this decision and for what their developers said about it (talks, interviews, postmortems). Cite the pages you used."
    : c.studios
      ? "This project uses Claude-Code-Game-Studios. Before answering, read the genre sheet for this game's genre under .claude/genres/ and use the project's design agents or skills where they fit."
      : null;
  return [
    ...(nudge ? ["--append-system-prompt", nudge] : []),
    "--settings",
    JSON.stringify(settings),
    "--allowedTools",
    ...allowed,
    "--disallowedTools",
    ...disallowed,
  ];
}

// Who the assistant works for. A questions file may set `team` ({ ja, en }) for its genre; the
// default is the deckbuilding roguelike team the first questions file was written for.
const DEFAULT_TEAM = {
  ja: "デッキ構築ローグライク（ローグライト）を作っているチーム",
  en: "a team making a deckbuilding roguelike (roguelite)",
};

const PREAMBLE = {
  ja: (team) => [
    `あなたは、${team}の開発アシスタントです。`,
    "開発者から次のゲームデザインの相談を受けました。普段どおりに、使えるスキル・資料・ツールがあれば使って答えてください。",
    "ファイルの作成・変更はしないでください。",
    "",
    "相談:",
  ],
  en: (team) => [
    `You are a development assistant on ${team}.`,
    "A developer brings you the game design question below. Answer as you normally would, using any skills, documents or tools you have.",
    "Do not create or change files.",
    "",
    "Question:",
  ],
};

/** The team a questions file names, or the default (roguelite) team. */
export function teamOf(cfg) {
  const qdoc = JSON.parse(readFileSync(cfg.questionsFile, "utf8"));
  return { ...DEFAULT_TEAM, ...(qdoc.team ?? {}) };
}

export function answerPrompt(question, lang, team = DEFAULT_TEAM) {
  return [...PREAMBLE[lang](team[lang]), `"${promptOf(question, lang)}"`].join("\n");
}

/**
 * Run `claude -p` with the prompt on stdin. Resolves with the raw stdout and stderr.
 * Never rejects on a non-zero exit: the caller records the failure with the run.
 */
export function runClaude(prompt, extraArgs, { cwd, timeoutMs = 15 * 60 * 1000 } = {}) {
  const bin = process.env.CLAUDE_BIN || "claude";
  const args = ["-p", "--no-session-persistence", ...extraArgs];
  return new Promise((resolvePromise) => {
    // No shell: the --settings JSON would be mangled by cmd.exe quoting. claude resolves via PATH.
    const child = spawn(bin, args, { cwd });
    let stdout = "";
    let stderr = "";
    const timer = setTimeout(() => child.kill(), timeoutMs);
    child.stdout.on("data", (d) => {
      stdout += d;
    });
    child.stderr.on("data", (d) => {
      stderr += d;
    });
    child.on("error", (err) => {
      clearTimeout(timer);
      resolvePromise({ code: -1, stdout, stderr: `${stderr}${err.message}` });
    });
    child.on("close", (code) => {
      clearTimeout(timer);
      resolvePromise({ code, stdout, stderr });
    });
    child.stdin.end(prompt);
  });
}

/** JSON.parse that returns null instead of throwing (stream lines, model replies). */
export function tryParseJson(text) {
  if (!text?.trimStart().startsWith("{")) return null;
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

/** Pull the answer, tool use and cost out of a stream-json transcript. */
export function parseStream(stdout) {
  const events = stdout.split(/\r?\n/).map(tryParseJson).filter(Boolean);
  // A call only counts as used when its result came back without an error or a permission refusal.
  const failed = new Set(
    events
      .filter((ev) => ev.type === "user")
      .flatMap((ev) => (Array.isArray(ev.message?.content) ? ev.message.content : []))
      .filter((b) => b.type === "tool_result")
      .filter(
        (b) => b.is_error || /haven't granted|permission.*denied/i.test(JSON.stringify(b.content)),
      )
      .map((b) => b.tool_use_id),
  );
  const tools = events
    .filter((ev) => ev.type === "assistant")
    .flatMap((ev) => ev.message?.content ?? [])
    .filter((block) => block.type === "tool_use")
    .map((block) => ({ name: block.name, input: block.input, ok: !failed.has(block.id) }));
  const result = events.findLast((ev) => ev.type === "result") ?? null;
  const usage = result?.usage ?? {};
  const tokens = [
    usage.input_tokens,
    usage.cache_creation_input_tokens,
    usage.cache_read_input_tokens,
    usage.output_tokens,
  ].reduce((sum, n) => sum + (n ?? 0), 0);
  return { tools, result, tokens };
}

/** What a run used, and whether a condition leaked (used a source it was meant to lack). */
export function toolSummary(cfg, tools, condKey) {
  const c = parseCondition(condKey);
  const ok = tools.filter((t) => t.ok);
  const skill = cfg.skillName.toLowerCase();
  const skillCalls = ok.filter((t) => t.name === "Skill").map((t) => t.input?.skill);
  const mcpCalls = ok
    .filter((t) => t.name.startsWith("mcp__"))
    .map((t) => t.name.split("__").pop());
  const mcpFailed = tools.filter((t) => !t.ok && t.name.startsWith("mcp__")).length;
  const filePaths = ok
    .filter((t) => ["Read", "Grep", "Glob"].includes(t.name))
    .map((t) => norm(t.input?.file_path ?? t.input?.path ?? t.input?.pattern));
  const kit = norm(KIT_DIR);
  const source = norm(cfg.playbookDir);
  const evalReads = filePaths.filter((p) => p.includes(kit));
  const playbookReads = filePaths.filter(
    (p) => p.includes(`/skills/${skill}/`) || p.includes(source),
  );
  const playbookSkills = skillCalls.filter((s) => {
    const n = String(s ?? "").toLowerCase();
    return n === skill || n.endsWith(`:${skill}`);
  });
  const usedSkill = playbookSkills.length > 0 || playbookReads.length > 0;
  const usedGameGene = mcpCalls.some((n) => n.startsWith("gamegene"));
  const leaks = [];
  if (!c.skill && usedSkill) leaks.push("skill");
  if (!c.mcp && usedGameGene) leaks.push("mcp");
  if (evalReads.length) leaks.push("eval");
  if (filePaths.some((p) => p.includes(source))) leaks.push("playbook-source");
  return { skillCalls, mcpCalls, mcpFailed, playbookReads, usedSkill, usedGameGene, leaks };
}

// Each item has anchored levels so the judge cannot hand out the top score by default.
// inTotal: false items are reported but kept out of the total (goldRecall favours the skill
// conditions; an MCP answer citing a fitting case from outside the playbook scores 0 there).
export const RUBRIC = [
  {
    key: "precedentFit",
    max: 3,
    inTotal: true,
    levels: [
      "no precedent from a shipped game",
      "precedents share only the genre or a loose theme",
      "an analogous mechanism or situation, but a different decision",
      "at least one precedent faced the same decision or mechanism as this question",
    ],
  },
  {
    key: "tradeoffs",
    max: 2,
    inTotal: true,
    levels: [
      "no cost or downside of any precedent's choice",
      "mentions a downside in passing",
      "states what a developer gave up, dropped, or warned about, and ties it to this decision",
    ],
  },
  {
    key: "decisionImpact",
    max: 2,
    inTotal: true,
    levels: [
      "precedents are absent or decoration; the recommendation would be the same without them",
      "precedents support a recommendation reached otherwise",
      "a precedent changes or sharpens the recommendation (picks an option, rules one out, or adds a condition)",
    ],
  },
  {
    key: "sourcing",
    max: 2,
    inTotal: true,
    levels: [
      "no attribution",
      "game named but no person or no source",
      "game, person and a source or record link for each precedent",
    ],
  },
  {
    key: "separation",
    max: 2,
    inTotal: true,
    levels: [
      "developer statements and its own ideas are mixed",
      "mostly separated",
      "every precedent is clearly marked as the developer's words vs its own reading",
    ],
  },
  {
    key: "honesty",
    max: 2,
    inTotal: true,
    levels: [
      "an invented or misattributed precedent, or general advice presented as a precedent",
      "no invention, but it does not say where nothing is on record (when expectGap applies) or overstates a case",
      "no invention, and it says plainly what is not on record or where a case is only a loose analogy",
    ],
  },
  {
    key: "actionability",
    max: 2,
    inTotal: true,
    levels: [
      "no next step",
      "generic next steps",
      "concrete options or measurements for the situation in the question, with what to decide",
    ],
  },
  {
    key: "goldRecall",
    max: 2,
    inTotal: false,
    levels: [
      "none of goldCases",
      "some of goldCases",
      "most or all of goldCases (null when goldCases is empty)",
    ],
  },
  {
    key: "gapHandling",
    max: 2,
    inTotal: false,
    levels: [
      "where no precedent fits (see expectGap), it stops at saying so, or fills the gap with unlabelled general advice",
      "it offers nearby analogies, labelled, but does not break the decision down or reason from a stated principle",
      "it splits the decision into parts that do have precedents and answers those, and/or reasons from a named principle (joseki) clearly labelled as reasoning, not precedent",
    ],
  },
];

/** Every reference file under the playbook's references/ folder, as paths relative to it. */
function referenceFiles(dir, prefix = "") {
  return readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory()
      ? referenceFiles(join(dir, e.name), `${prefix}${e.name}/`)
      : e.name.endsWith(".md")
        ? [`${prefix}${e.name}`]
        : [],
  );
}

/**
 * The playbook reference files for the given gold questions, concatenated for a judge prompt.
 * A gold question is a question id (`stalemates`), matched as `NN-<id>.md` in any folder under
 * references/, so the same questions file works for a one-genre playbook (references/NN-id.md)
 * and a layered one (references/<layer>/NN-id.md). A number is the older form: the NN- prefix
 * in references/ itself.
 */
export function referencesFor(cfg, golds) {
  const dir = join(cfg.playbookDir, "references");
  if (!existsSync(dir)) return "";
  const files = referenceFiles(dir).sort();
  return golds
    .map((g) =>
      typeof g === "number"
        ? files.find((f) => !f.includes("/") && f.startsWith(`${String(g).padStart(2, "0")}-`))
        : files.find((f) => /^\d+-(.+)\.md$/.exec(f.split("/").pop())?.[1] === g),
    )
    .filter(Boolean)
    .map((f) => `--- ${f} ---\n${readFileSync(join(dir, f), "utf8")}`)
    .join("\n\n");
}

export function extractJson(text) {
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start < 0 || end < start) return null;
  try {
    return JSON.parse(text.slice(start, end + 1));
  } catch {
    return null;
  }
}

/** Launch flags for a judge: no tools, no skill, no MCP. */
export function judgeArgs(cfg, model) {
  return [
    "--output-format",
    "json",
    ...(model ? ["--model", model] : []),
    "--settings",
    JSON.stringify({
      disableClaudeAiConnectors: true,
      skillOverrides: { [cfg.skillName]: "off" },
      permissions: { deny: [denyRead(KIT_DIR), denyRead(cfg.playbookDir)] },
    }),
    "--disallowedTools",
    ...[...COMMON_DISALLOWED, "Read", "Grep", "Glob", "Skill", "ToolSearch"],
  ];
}

/** Run a judge prompt and return its parsed JSON reply (or null with the raw text). */
export async function askJudge(cfg, runId, prompt, model) {
  const { stdout, stderr } = await runClaude(prompt, judgeArgs(cfg, model), {
    cwd: judgeWorkspace(runId),
  });
  const raw = String(tryParseJson(stdout)?.result ?? stdout);
  const json = extractJson(raw);
  return { json, error: json ? null : (raw || stderr).slice(0, 500) };
}

/** Read a jsonl file into rows (missing file → []). */
export function readJsonl(path) {
  if (!existsSync(path)) return [];
  return readFileSync(path, "utf8")
    .split("\n")
    .filter(Boolean)
    .map((l) => JSON.parse(l));
}

/** Hide which sources an answer used, so judges grade content rather than the condition. */
export function maskSources(cfg, text) {
  const skill = cfg.skillName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return text
    .replace(/https?:\/\/(?:stg\.)?gamegene\.app\/\S*/gi, "[record link]")
    .replace(new RegExp(`${skill}|GameGene(?:\\s*MCP)?|プレイブック|playbook`, "gi"), "[source]")
    .replace(/スキル|\bskill\b|MCP/gi, "[source]")
    // Condition G names its kit and its genre sheets ("chipsets"); hide those the same way.
    .replace(/Claude[- ]Code[- ]Game[- ]Studios|Game Studios|chipsets?|チップセット/gi, "[source]");
}

/** The last successful answer for each key in a run (failed attempts are retried under the same key). */
export function latestAnswers(runDir) {
  const byKey = new Map();
  for (const r of readJsonl(join(runDir, "answers.jsonl"))) {
    if (!r.error || !byKey.get(r.key) || byKey.get(r.key).error) byKey.set(r.key, r);
  }
  return [...byKey.values()].filter((r) => !r.error);
}

/** Run async jobs with a fixed number in flight. */
export async function pool(items, concurrency, worker) {
  let next = 0;
  const runners = Array.from({ length: Math.min(concurrency, items.length) }, async () => {
    while (next < items.length) {
      const i = next++;
      await worker(items[i], i);
    }
  });
  await Promise.all(runners);
}
