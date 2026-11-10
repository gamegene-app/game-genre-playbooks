# Measured results

The numbers behind the summary table in the [README](../README.md#does-it-help). Each run uses the [eval kit](README.md): Claude Code answers with headless `claude -p`, and a separate Claude grades each answer against the same rubric without knowing the condition. Scores are 0–1.

Conditions: **A** playbook only, **B** playbook + GameGene MCP, **C** GameGene MCP only, **D** neither.

Caveats for every run: the grader is the same model family as the answerer, and each condition has between 18 and 36 answers, so read the numbers as a rough guide.

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
