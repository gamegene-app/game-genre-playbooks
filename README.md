# game-genre-playbooks

[![Playbooks: 1](https://img.shields.io/badge/playbooks-1-2ea043)](#genres)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Data: GameGene](https://img.shields.io/badge/data-GameGene-c8553d)](https://gamegene.app/about)
[![Connect the GameGene MCP](https://img.shields.io/badge/MCP-connect%20GameGene-6e56cf)](https://gamegene.app/mcp)
[![mcptry](https://mcptry.com/badge/app.gamegene/gamegene)](https://mcptry.com/servers/app.gamegene/gamegene)
[![GameGene MCP connector – tool definition quality and endpoint health on Glama](https://glama.ai/mcp/connectors/app.gamegene/gamegene/badges/score.svg)](https://glama.ai/mcp/connectors/app.gamegene/gamegene)

**Stuck on a design decision in your genre? See how shipped games in that genre decided it, and what they threw away.**

Making a game in a crowded genre means making the same calls again and again. Should a broken combo stay in? How much of the next fight should the player see? Is my twist really new, or just a reskin? An AI assistant will give you a sensible general answer. What you usually need is something else: which games in *your* genre faced the same call, what their developers chose, why, and what they cut.

These playbooks give your AI agent (Claude Code, Codex, Cursor and others that read skills) exactly that, one genre at a time, with every case traced to a talk, interview or postmortem.

## Install

Copy a playbook folder into your agent's skills folder. For Claude Code:

```bash
git clone https://github.com/gamegene-app/game-genre-playbooks.git
cp -R game-genre-playbooks/skills/roguelite ~/.claude/skills/roguelite-playbook
```

To use it in one project only, copy it into that project's `.claude/skills/` instead:

```bash
cp -R game-genre-playbooks/skills/roguelite <your-project>/.claude/skills/roguelite-playbook
```

Other agents that read `SKILL.md` folders (Codex, Cursor and others) take the same folder. Then ask your agent about a design call, for example "Should my deckbuilder let players skip card rewards?"

## When to reach for a playbook

- You are choosing between two mechanics and want precedents, not opinions
- You suspect your idea already exists in your genre and want to check
- You want to stand out without making "a worse version of that famous game"
- You need to explain a design call to your team, a publisher or players, with a source to point to

## What you get

- The design questions that matter in that genre, in the order you hit them
- For each question, the games that faced it, what their developers decided, and the ideas they dropped
- The design principles (joseki) behind those decisions, with who first stated them, and the games that deliberately broke them
- Sources for every case, so you can read the original and decide for yourself

General game design (core loops, economy, difficulty, onboarding, playtesting) is already well covered by other skills. These playbooks do not repeat it.

## Genres

1. **[Roguelites, including deckbuilding roguelikes](skills/roguelite/SKILL.md)** (16 questions). First, because the records are thickest here.
2. More genres are added only once their records are complete enough.

## Where the data comes from

Everything here is generated from [**GameGene**](https://gamegene.app/about), a sourced database of game design lineage. GameGene records where a mechanic came from and where it went, in the developers' own words, and keeps a developer's statement apart from a critic's reading.

A playbook carries the questions and the principles. For the full cases and sources, connect the [**GameGene MCP server**](https://gamegene.app/mcp) to your AI app (a free account is enough). With it connected, your agent pulls the cases while it reviews your design.

## Requests

| What you want | Where to ask |
|---|---|
| A new **genre** playbook | [Open an issue here](../../issues/new?template=genre-request.yml) |
| A new **design question** or viewpoint for an existing genre | [Open an issue here](../../issues/new?template=viewpoint-request.yml) |
| A specific **game**, or a **research question** about one | [Send a research request on GameGene](https://gamegene.app/feedback?panel=submit). It goes straight into GameGene's research queue, so it is usually handled sooner than an issue here, and the result reaches every playbook that uses it |

## How it works

The playbooks are generated from GameGene's database on a schedule, without an LLM, and committed here only when something changed. No skill in this repository calls the network on its own; the cases come from the GameGene MCP server when you connect it.

---

## 日本語

**ジャンルの設計判断で迷ったら、同じジャンルの作品がどう決め、何を捨てたかを見る。**

人の多いジャンルでは、同じ判断を何度も迫られます。壊れたコンボを残すか。次の戦いをどこまで見せるか。自分のひねりは新しいのか、見た目を替えただけか。AI に聞けば一般論は返ってきます。けれど本当に要るのは、自分のジャンルで同じ判断をした作品と、その作り手が何を選び、なぜそうし、何を削ったかです。

この作戦帳は、それをジャンルごとに、講演・インタビュー・ポストモーテムの出典つきで AI に渡します。

- データの出どころは [GameGene](https://gamegene.app/about)。全部の事例と出典は [GameGene MCP](https://gamegene.app/mcp)（無料のアカウントで使えます）で引けます
- 新しいジャンルや観点の依頼は、このリポジトリの Issue へ
- 個別の作品や調査の依頼は [GameGene の調査依頼](https://gamegene.app/feedback?panel=submit) へ。GameGene の調査の順番に直接入るので、こちらのほうが早く対応できます
- 最初の1本は [ローグライト（デッキ構築ローグライクを含む）](skills/roguelite/SKILL.md) で、問いは16本です。入れ方は上の Install（`skills/roguelite` を `~/.claude/skills/` へ写す。1つのプロジェクトだけで使うなら `<プロジェクト>/.claude/skills/` へ）

## License

MIT
