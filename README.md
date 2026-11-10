# game-genre-playbooks

**English** | [日本語](README.ja.md)

[![Genres: 3 + shared](https://img.shields.io/badge/genres-3%20%2B%20shared-2ea043)](#genres)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Data: GameGene](https://img.shields.io/badge/data-GameGene-c8553d)](https://gamegene.app/about?utm_source=game-genre-playbooks&utm_medium=readme)
[![Connect the GameGene MCP](https://img.shields.io/badge/MCP-connect%20GameGene-6e56cf)](https://gamegene.app/mcp?utm_source=game-genre-playbooks&utm_medium=readme)
[![mcptry](https://mcptry.com/badge/app.gamegene/gamegene)](https://mcptry.com/servers/app.gamegene/gamegene)
[![GameGene MCP connector – tool definition quality and endpoint health on Glama](https://glama.ai/mcp/connectors/app.gamegene/gamegene/badges/score.svg)](https://glama.ai/mcp/connectors/app.gamegene/gamegene)

**Stuck on a design call in your genre? Get the answer other developers in that genre gave, and what it cost them.**

Making a game in a crowded genre means making the same calls again and again. Should a card that never gets stronger be retuned or cut? How much of the next fight should the player see? Is my twist new, or a reskin? An AI assistant will give you a sensible general answer. What you usually need is something else: which shipped games faced the same call, what their developers chose, why, and what they gave up.

This playbook gives your AI agent (Claude Code, Codex, Cursor and others that read skills) exactly that, with every case traced to a talk, interview or postmortem. It is one skill in two layers: design calls that cross genres, and the calls specific to each genre.

## Install

In Claude Code (2.1.275 or later):

```
/plugin install game-design-playbook --marketplace gamegene-app/game-genre-playbooks
```

<details>
<summary>Older Claude Code, other agents, or a single project</summary>

On older Claude Code, add the marketplace first:

```
/plugin marketplace add gamegene-app/game-genre-playbooks
/plugin install game-design-playbook@gamegene
```

Or copy the folder by hand. Other agents that read `SKILL.md` folders (Codex, Cursor and others) take the same folder.

```bash
git clone https://github.com/gamegene-app/game-genre-playbooks.git
cp -R game-genre-playbooks/skills/game-design-playbook ~/.claude/skills/game-design-playbook
# one project only:
cp -R game-genre-playbooks/skills/game-design-playbook <your-project>/.claude/skills/game-design-playbook
```

**Upgrading from the roguelite playbook** (`roguelite-playbook`, until 8 November 2026): its 16 questions are all in this skill now. Delete the old folder so the agent does not see both: `rm -rf ~/.claude/skills/roguelite-playbook`

</details>

Then ask your agent about a design call in your own words, for example:

- "Should my deckbuilder let players skip card rewards?"
- "Should the player in my horror game be able to fight back?"
- "Should my life sim run on the real clock?"

You do not need to name the skill. If your project's CLAUDE.md or README names the genre, the agent picks that genre's questions.

## What you get

From a solo developer who used it on their own deckbuilder ([full write-up](../../issues/2)):

- **Less time going in circles.** A card that numbers could not fix stopped being an endless tuning loop once the answer came back that Balatro's developer cut cards more often than he retuned them.
- **The cost of the road not taken, before you build it.** Into the Breach's cap on battle length came with its downside: it keeps fights moving, and it punishes slow, careful play.
- **A reason you can point to.** Each decision rests on a named game, a named developer and a source, so you can explain it to your team, a publisher, players, or your future self.
- **"Not on record" is an answer too.** When nothing is recorded, the playbook says so instead of inventing a case. That marks the spot you will have to test yourself, and maybe where you are doing something new.
- **Words for your game's core.** Principles such as "information horizon" and "input vs output randomness" turn a hunch into something you can write in a design doc.

The playbook adds sourced precedents to a decision. Your own playtests and numbers still decide it.

## Genres

All in one skill, [`game-design-playbook`](skills/game-design-playbook/SKILL.md):

| Layer | Questions | Examples |
|---|---|---|
| **Any genre** (shared) | 10 | how much of the enemy's next move to show, where randomness lives, how losing feels, difficulty tiers, stalemates, options nobody uses, teaching without a tutorial |
| **Roguelites**, including deckbuilding roguelikes | 7 | deck size and card removal, card rewards, run length, meta progression, what to change from Slay the Spire |
| **Horror** | 10 | whether the player can fight back, what escaping and hiding cost, pacing fear, monster AI, camera, saving, sanity |
| **Cozy games and life sims** | 9 | the game clock, a calendar of limited days, relationships, playing together apart, coming back daily, endings, pets, low stakes |

Each case in the shared layer is labelled with its game's genres, so the agent can prefer a precedent from your genre and still reach across genres. A genre is added once GameGene's records for it are thick enough. **Next: tactics and strategy**, then puzzle games built on deduction and knowledge. The cozy layer has no farming game yet (Stardew Valley and Story of Seasons are not on GameGene's records), so farming decisions show as "not on record yet".

## Does it help?

Claude Code answered the same design questions under four conditions, and a separate Claude graded the answers without knowing the condition (0–1).

| Questions | No playbook | GameGene MCP only | This playbook | Playbook + MCP |
|---|---|---|---|---|
| A developer's own deckbuilder, 10 × 3 answers | 0.31 | 0.74 | 0.92 | 0.94 |
| Horror, 10 × 2 (10 Nov 2026) | 0.56 | 0.84 | 0.95 | 0.96 |
| Cozy games and life sims, 9 × 2 (9 Nov 2026) | 0.42 | | 0.92 | |
| Roguelites, 12 × 3 (8 Nov 2026) | | | 0.95 | |

- No graded answer under any condition contained an invented precedent.
- The playbook used about half the tokens of the MCP alone. MCP-only answers cited their sources less clearly (1.2 of 2 against 1.9 with the playbook).
- The grader is the same model family as the answerer and the samples are small, so read these as a rough guide.

Method, per-run notes and how to re-run: [eval/RESULTS.md](eval/RESULTS.md) and the [eval kit](eval/).

## Where the data comes from

Everything here is generated from [**GameGene**](https://gamegene.app/about?utm_source=game-genre-playbooks&utm_medium=readme), a sourced database of game design lineage. GameGene records where a mechanic came from and where it went, in the developers' own words, and keeps a developer's statement apart from a critic's reading.

The playbooks are generated from GameGene's database without an LLM, and committed here only when something changed. No skill in this repository calls the network on its own.

The playbook carries the questions, the principles and a few hand-picked cases for each. For the full set of cases, records added since the last update, and games in other genres, connect the [**GameGene MCP server**](https://gamegene.app/mcp?utm_source=game-genre-playbooks&utm_medium=readme) (a free account is enough). With it connected, the playbook tells your agent to use it for two things only: filling a question's "not on record yet" gaps, and finding games in other genres that share the same mechanism. Each question lists GameGene entry points, so the agent goes straight to the records instead of searching.

## Requests

| What you want | Where |
|---|---|
| A new **genre** playbook | [Open an issue here](../../issues/new?template=genre-request.yml) |
| A new **design question** for an existing genre | [Open an issue here](../../issues/new?template=viewpoint-request.yml) |
| A specific **game**, or a **research question** about one | [Research request on GameGene](https://gamegene.app/feedback?panel=submit&utm_source=game-genre-playbooks&utm_medium=readme). It goes straight into GameGene's research queue, so it is usually handled sooner |
| A problem with the **MCP server**, or an idea for its tools | [gamegene-mcp issues](https://github.com/gamegene-app/gamegene-mcp/issues) |

## License

MIT
