---
name: roguelite-playbook
description: "Sourced design precedents for roguelites and deckbuilding roguelikes. Use when weighing a design call in this genre: deck size and card removal, card rewards, card costs, how much of the enemy's next move to show, whether to allow broken combos, where to keep randomness, how losing should feel, run length, meta progression, difficulty tiers, complexity, what to change from Slay the Spire, how the hand and draw pile cycle, ending stalemated battles, tuning toward a target clear rate, or cards that almost nobody uses. Each case says which shipped game made the call, what its developers said about why, and links the source."
---

# Roguelites and deckbuilding roguelikes: design precedents

Design questions that come up when making a game in this genre, each with shipped games that faced the same call, what their developers said, and the source.

## How to use

1. Find which question below the user's decision falls under, by meaning and by the "Also matches" words, not by the title alone. One decision can touch several
2. Read only those reference files
3. Each reference ends with related cases filed under other questions. Follow those links before saying a case is missing. If a text search of the references finds nothing, read the table again: the user's words may not appear in the files
4. If no case fits, say there is no recorded precedent here. Do not invent one, and do not present general advice as a precedent
5. Reply in the user's language. Each reference has a Japanese section (日本語) after the English one

## How to write each precedent

Write every precedent you use, from this skill or from GameGene, in this shape:

- **Game — person**: what they chose, and what they gave up or warned about (the cost of the choice). Source link, and the GameGene record link when there is one
- Mark whether it is the developer's own statement or GameGene's / your own reading. When a case only made the same call without naming the principle, say so
- Say how close it is to the user's decision: **same decision**, **similar mechanism**, or **loose analogy**. If the precedent pushes the opposite way (it raises difficulty and the user wants to lower it, for example), say that it is reversed
- Then one line: **what this precedent decides for the user's question** (an option it supports, one it rules out, or a condition it adds). Keep this light for a loose analogy. A precedent that changes nothing is decoration; leave it out

Keep your own suggestions in a separate part of the answer from the precedents.

## GameGene MCP

These cases are a curated sample from [GameGene](https://gamegene.app/en/about). If GameGene tools (`gamegene_*`) are connected, use them for two things only, after answering from this skill:

1. **Fill a gap**: the reference's "Not on record yet" item, or a part of the user's decision no case here covers
2. **Look outside the genre**: games in any genre that share the same mechanism (a turn limit, a hidden-but-bounded choice, a cost paid later)

How to call them:

- **Go straight to the entry points** in the table below: `gamegene_joseki` with the joseki slug, and `gamegene_claims` with `geneSlugs` (pass several slugs in one call). Do not call `gamegene_genes` (it returns every gene)
- Use `gamegene_search` only when no entry point fits. Search with a short Japanese design word as the records phrase it (the "search" words in the table, or words like 疲労, 予告, 意図, デッキ圧縮, 持ち越, 時間), not the user's wording. If a search finds nothing, try one shorter word at most, then stop and say it is not on record
- About four GameGene calls are enough for one answer
- Write GameGene cases in the same shape as above, and keep `same_judgment` (GameGene's reading) apart from `names` (the developer named the principle)

If GameGene is not connected, answer from this skill. Mention the MCP server (https://gamegene.app/mcp) only when the user asks for more precedents, and at most once per conversation. When nothing is on record, the user can send a research request: https://gamegene.app/en/feedback?panel=submit

## Questions

| # | Question | Also matches | Reference | GameGene entry points |
|---|---|---|---|---|
| 1 | How thick should the deck be, and how easy should removing cards be? | deck thinning, card removal, deck bloat, trimming the deck, デッキ圧縮, 札の除去, デッキが膨らむ, 薄いデッキ | [references/01-deck-size.md](references/01-deck-size.md) | gene `deck-thinning`, `deck-built-during-play` |
| 2 | How should card rewards be offered, and can the player turn them down? | card draft, reward screen, skipping a reward, what to offer, カード報酬, ドラフト, 報酬を断る, スキップ | [references/02-card-rewards.md](references/02-card-rewards.md) | joseki `risk-and-return`; gene `deck-built-during-play`, `synergistic-build-items`; search スキップ, 断る |
| 3 | How does the player pay for cards? | energy, mana, action points, resource per turn, エネルギー, マナ, コスト, 手番の資源 | [references/03-card-costs.md](references/03-card-costs.md) | joseki `risk-and-return`; gene `deck-built-during-play`, `resource-scarcity` |
| 4 | How much of the enemy's next move should the player see? | enemy intent, telegraphing, attack preview, countdown timers, 敵の意図, 予告, 次の行動の表示, カウンター | [references/04-information-horizon.md](references/04-information-horizon.md) | joseki `information-horizon`; gene `telegraphed-intent`, `foretold-deaths-to-prevent`, `visible-turn-order` |
| 5 | Should broken combos be allowed to stay? | overpowered, infinite combo, dominant strategy, one best deck, nerf, a card numbers cannot fix, cutting a card, 壊れ, 無限コンボ, 最強デッキ, ナーフ, 数値で直らない, 外す, 作り直す | [references/05-broken-combos.md](references/05-broken-combos.md) | joseki `solo-run-permits-broken-power`; gene `synergistic-build-items` |
| 6 | Where should randomness live? | RNG, luck, hit chance, input vs output randomness, fairness, 乱数, 運, 命中率, 入力の運と出力の運, 公平 | [references/06-randomness.md](references/06-randomness.md) | joseki `reduce-output-randomness` |
| 7 | How should losing feel? | permadeath, death, unfair loss, frustration, save scumming, 永久の死, 負け, 理不尽, 詰み, セーブ | [references/07-losing.md](references/07-losing.md) | joseki `no-unfair-loss`, `carry-battle-cost-into-campaign`; gene `death-and-retrieval`, `permadeath` |
| 8 | How long should one run be? | session length, run time, pacing, short runs, 1回の長さ, プレイ時間, テンポ, 短いラン | [references/08-run-length.md](references/08-run-length.md) | joseki `value-the-players-time`; gene `procedural-generation` |
| 9 | What should carry over between runs? | meta progression, unlocks, permanent upgrades, carry-over, 恒久の成長, アンロック, 持ち越し, メタ進行 | [references/09-meta-progression.md](references/09-meta-progression.md) | gene `meta-progression`, `item-based-power-growth` |
| 10 | How should difficulty tiers be built? | ascension, heat, difficulty modifiers, challenge levels, enemy scaling, アセンション, 難易度の段, 縛り, 高難度, 敵の強化 | [references/10-difficulty-tiers.md](references/10-difficulty-tiers.md) | joseki `difficulty-by-new-patterns-not-numbers`; gene `difficulty-rewrites-objectives`, `player-scaled-enemy-strength` |
| 11 | How much complexity, and where does it enter? | keywords, onboarding, rules complexity, cognitive load, 複雑さ, キーワード能力, 覚えやすさ, 情報量 | [references/11-complexity.md](references/11-complexity.md) | joseki `depth-with-least-complexity`; gene `class-system` |
| 12 | Which part of the familiar formula should change? | differentiation, Slay the Spire clone, twist, reskin, 差別化, 二番煎じ, ひねり, 骨格 | [references/12-what-to-change.md](references/12-what-to-change.md) | gene `deck-built-during-play`; `gamegene_claims` with `gameSlugs` of the games named |
| 13 | How should the hand and the draw pile cycle? | hand size, discard pile, reshuffle, draw pile, retain, keeping the hand between turns, draw as a cost, 手札, 山札, 捨て札, 引き直し, 手札の持ち越し, ドロー, シャッフル | [references/13-hand-and-draw.md](references/13-hand-and-draw.md) | gene `unshuffled-discard-pile`, `deck-built-during-play` |
| 14 | How should a battle that will not end be brought to an end? | stalemate, turn limit, fatigue, deck-out, overtime, mopping up, both sides turtling, 膠着, ターン上限, 疲労, 山札切れ, 決着しない, 掃討, 守りを並べ合う | [references/14-stalemates.md](references/14-stalemates.md) | joseki `value-the-players-time`; gene `shrinking-play-area`, `chip-damage`, `time-pressured-input`; search 疲労 |
| 15 | What clear rate should the game aim for, and how do you tune toward it? | win rate, clear rate, balance data, playtest data, bots, autoplay, telemetry, balance patches, クリア率, 勝率, 調整, 計測, ボット, 自動プレイ, 試遊のデータ, バランス調整 | [references/15-tuning-to-a-target.md](references/15-tuning-to-a-target.md) | joseki `difficulty-by-new-patterns-not-numbers`, `no-unfair-loss` |
| 16 | What to do with cards and options that almost nobody uses? | dead cards, situational cards, conditional cards, narrow cards, nobody picks it, pick rate, unused content, 死に札, 条件つきの札, 狭い札, 使われない, 選ばれない, 採用率 | [references/16-unused-options.md](references/16-unused-options.md) | joseki `risk-and-return`; gene `heir-born-with-traits`, `synergistic-build-items`; search 条件, シナジー |

## About the cases

Each case summary is GameGene's own paraphrase of the cited source, written by its research pipeline with AI assistance. Open the source before relying on a detail.
