# Measured results

The numbers behind the summary table in the [README](../README.md#does-it-help). Each run uses the [eval kit](README.md): Claude Code answers with headless `claude -p`, and a separate Claude grades each answer against the same rubric without knowing the condition. Scores are 0–1.

Conditions: **A** playbook only, **B** playbook + GameGene MCP, **C** GameGene MCP only, **D** neither, **W** web search only, **V** playbook + web search, **G** Claude-Code-Game-Studios. A–D have no web search.

Caveats for every run: the grader is the same model family as the answerer, and each condition has between 18 and 36 answers, so read the numbers as a rough guide.

## Against web search and Claude-Code-Game-Studios (10 November 2026)

The 12 roguelite questions (`questions/roguelite.json`) × 2 answers under A, D, W, V and G, scored blind and ranked side by side (five answers per question). Game Studios was [Donchitos/Claude-Code-Game-Studios](https://github.com/Donchitos/Claude-Code-Game-Studios) at `abc0de7` (1.3.0, 9 Nov 2026), copied into the answering folder without its `settings.json` and hooks.

| Condition | Score | Rank (1–5) | precedentFit /3 | tradeoffs /2 | sourcing /2 | separation /2 | honesty /2 | Tokens | Seconds |
|---|---|---|---|---|---|---|---|---|---|
| V Playbook + web search | 0.94 | 1.26 | 3.00 | 1.96 | 1.38 | 1.96 | 1.88 | 317k | 99 |
| W Web search only | 0.86 | 1.91 | 2.96 | 1.75 | 1.04 | 1.54 | 1.75 | 254k | 107 |
| A This playbook | 0.94 | 2.87 | 2.75 | 2.00 | 1.58 | 1.83 | 1.88 | 167k | 57 |
| D Neither | 0.56 | 4.43 | 1.96 | 0.58 | 0.83 | 0.96 | 1.13 | 73k | 48 |
| G Claude-Code-Game-Studios | 0.47 | 4.52 | 1.46 | 0.42 | 0.63 | 0.96 | 1.00 | 165k | 58 |

- **Each alternative at its best.** In a trial run, left to itself, W did not search and G did not open its genre sheet, so both answered from memory. W is told to search for shipped games and their developers' words and to cite pages; G is told to read its genre sheet and use the project's agents or skills. Both also may use what they need for that (W the web, G subagents).
- V ranked first or tied first on 11 of 12 questions. W took Q07 (target clear rate) with Slay the Spire 2's published win rates.
- The judges' reasons for ranking W above A were fit: search found recent, exactly matching cases (Slay the Spire 2's Inflation ascension, its infinite-combo nerf and the backlash), where the playbook's closest records were analogies (Luck be a Landlord, Roguebook). They marked W down for fan estimates and secondhand articles.
- G read its `roguelike-deckbuilder` sheet and was marked down for leaning on project sheets and tooling instead of shipped games.
- One D answer leaked in the first pass: it searched the user's Claude memory, found another clone of this repo, and read the playbook from it. The kit now denies the memory folders to every condition and any copy of the playbook to skill-off conditions; the answer was discarded and re-run.
- One of the 24 ranked groups failed to parse and is missing from the rank column.
- No grader checked that pages found by search exist or say what the answer claims.

## A developer's own deckbuilder (first measurement)

The same solo developer had Claude Code answer 10 design questions from their own deckbuilding roguelike project, 3 times each, under each condition ([method and details](https://github.com/gamegene-app/game-genre-playbooks/issues/3)).

| Condition | Score |
|---|---|
| D No playbook, no GameGene | 0.31 |
| C GameGene MCP only | 0.74 |
| A This playbook | 0.92 |
| B This playbook + GameGene MCP | 0.94 |

- Without a source of precedents, every precedent-related item scored zero.
- The playbook alone used about half the tokens of the MCP alone.
- No condition produced an invented precedent.
- The two playbook rows are the current SKILL.md, measured in a second run on the same questions; the other two rows are from the first run.

## Roguelites, after the layer split (8 November 2026)

After the playbook was split into a shared layer and genre layers, the 12 roguelite questions were re-run without a project, from empty folders, playbook only (no MCP), 3 answers per question.

| | Before the split | After the split |
|---|---|---|
| A This playbook | 0.94 | 0.95 |

## Horror (10 November 2026)

10 horror questions × 2 answers, all four conditions, after adding new developer statements (Frictional, Outlast, Resident Evil 2 (2019), Left 4 Dead, Alien: Isolation's search behaviour). The blind ranking compares the four answers to each question side by side, so 1 is best and 4 is worst.

| Condition | Score | Blind ranking (1–4) |
|---|---|---|
| D No playbook, no GameGene | 0.56 | 4.0 |
| C GameGene MCP only | 0.84 | 1.8 |
| A This playbook | 0.95 | 2.1 |
| B This playbook + GameGene MCP | 0.96 | 2.1 |

- MCP-only answers ranked well but cited their sources less clearly (sourcing 1.2 of 2 against 1.9 with the playbook).
- The first horror measurement (8 November, playbook vs none) gave 0.94 and 0.56; with the playbook, all 10 questions ranked first.

## Cozy games and life sims (9 November 2026)

9 questions × 2 answers.

| Condition | Score | Blind ranking (1 = best) |
|---|---|---|
| D No playbook, no GameGene | 0.42 | 2.0 |
| A This playbook | 0.92 | 1.0 (first on all 9 questions) |

No invented precedent was found in any answer.
