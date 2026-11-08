---
name: game-design-playbook
description: "Sourced design precedents for game developers: design calls that cross genres, plus genre layers for roguelites (including deckbuilding roguelikes) and horror. Use when weighing a design call such as how much of the enemy's next move to show, broken combos, where randomness lives, how losing feels, difficulty tiers, complexity, stalemated battles, a target clear rate, or options nobody uses; in a roguelite, deck size and card removal, card rewards and costs, run length, meta progression, the hand and draw pile, or what to change from Slay the Spire; in horror, whether the player can fight back, what escaping and hiding cost, making the player face the threat, pacing fear, monster AI, camera and viewpoint, saving, companions, stress and sanity, or how the story reaches the player. Each case names the shipped game, what its developers said about why, and links the source."
---

# Game design playbook: design precedents

Design questions that come up when making a game, each with shipped games that faced the same call, what their developers said, and the source. Questions that cross genres come first; then each genre has its own questions.

## How to use

1. Decide the genre: from the user's words, or the project's CLAUDE.md, README or design doc. Genres here: `roguelite` (Roguelites and deckbuilding roguelikes), `horror` (Horror). The questions for any genre apply to every game. If the user's genre is not listed, use those and say this playbook has no genre-specific cases for it
2. Find which question in the tables below the user's decision falls under, by meaning and by the "Also matches" words, not by the title alone. Look in both the shared table and the genre's table. One decision can touch several
3. Read only those reference files
4. Each reference ends with related cases filed under other questions. Follow those links before saying a case is missing. If a text search of the references finds nothing, read the tables again: the user's words may not appear in the files
5. In the shared references, each case is labelled with the genres its game belongs to. Prefer a case from the user's genre when two fit equally well, and say when a precedent comes from another genre
6. If no case fits, say there is no recorded precedent here. Do not invent one, and do not present general advice as a precedent
7. Reply in the user's language. Each reference has a Japanese section (日本語) after the English one

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

- **Go straight to the entry points** in the tables below: `gamegene_joseki` with the joseki slug, and `gamegene_claims` with `geneSlugs` (pass several slugs in one call). Do not call `gamegene_genes` (it returns every gene)
- To stay inside the user's genre, `gamegene_games` takes `tags` (for example `horror`, `roguelite`, `deckbuilder`)
- Use `gamegene_search` only when no entry point fits. Search with a short Japanese design word as the records phrase it (the "search" words in the tables, or words like 疲労, 予告, 意図, デッキ圧縮, 持ち越, 時間), not the user's wording. If a search finds nothing, try one shorter word at most, then stop and say it is not on record
- About four GameGene calls are enough for one answer
- Write GameGene cases in the same shape as above, and keep `same_judgment` (GameGene's reading) apart from `names` (the developer named the principle)

If GameGene is not connected, answer from this skill. Mention the MCP server (https://gamegene.app/mcp) only when the user asks for more precedents, and at most once per conversation. When nothing is on record, the user can send a research request: https://gamegene.app/en/feedback?panel=submit

## Questions for any genre (`shared`)

| # | Question | Also matches | Reference | GameGene entry points |
|---|---|---|---|---|
| 1 | How much of the enemy's next move should the player see? | enemy intent, telegraphing, attack preview, countdown timers, 敵の意図, 予告, 次の行動の表示, カウンター | [references/shared/01-information-horizon.md](references/shared/01-information-horizon.md) | joseki `information-horizon`; gene `telegraphed-intent`, `foretold-deaths-to-prevent`, `visible-turn-order` |
| 2 | Should broken combos be allowed to stay? | overpowered, infinite combo, dominant strategy, one best deck, nerf, a card numbers cannot fix, cutting a card, 壊れ, 無限コンボ, 最強デッキ, ナーフ, 数値で直らない, 外す, 作り直す | [references/shared/02-broken-combos.md](references/shared/02-broken-combos.md) | joseki `solo-run-permits-broken-power`; gene `synergistic-build-items` |
| 3 | Where should randomness live? | RNG, luck, hit chance, input vs output randomness, fairness, 乱数, 運, 命中率, 入力の運と出力の運, 公平 | [references/shared/03-randomness.md](references/shared/03-randomness.md) | joseki `reduce-output-randomness` |
| 4 | How should losing feel? | permadeath, death, unfair loss, frustration, save scumming, getting stuck, 永久の死, 負け, 理不尽, 詰み, セーブ, 行き詰まり | [references/shared/04-losing.md](references/shared/04-losing.md) | joseki `no-unfair-loss`, `carry-battle-cost-into-campaign`; gene `death-and-retrieval`, `permadeath` |
| 5 | How should difficulty tiers be built? | ascension, heat, difficulty modifiers, difficulty modes, challenge levels, enemy scaling, アセンション, 難易度の段, 難易度の選択, 縛り, 高難度, 敵の強化 | [references/shared/05-difficulty-tiers.md](references/shared/05-difficulty-tiers.md) | joseki `difficulty-by-new-patterns-not-numbers`; gene `difficulty-rewrites-objectives`, `player-scaled-enemy-strength` |
| 6 | How much complexity, and where does it enter? | keywords, onboarding, rules complexity, cognitive load, controls, 複雑さ, キーワード能力, 覚えやすさ, 情報量, 操作の数 | [references/shared/06-complexity.md](references/shared/06-complexity.md) | joseki `depth-with-least-complexity`; gene `class-system` |
| 7 | How should a battle that will not end be brought to an end? | stalemate, turn limit, fatigue, deck-out, overtime, mopping up, both sides turtling, 膠着, ターン上限, 疲労, 山札切れ, 決着しない, 掃討, 守りを並べ合う | [references/shared/07-stalemates.md](references/shared/07-stalemates.md) | joseki `value-the-players-time`; gene `shrinking-play-area`, `chip-damage`, `time-pressured-input`; search 疲労 |
| 8 | What clear rate should the game aim for, and how do you tune toward it? | win rate, clear rate, balance data, playtest data, bots, autoplay, telemetry, balance patches, クリア率, 勝率, 調整, 計測, ボット, 自動プレイ, 試遊のデータ, バランス調整 | [references/shared/08-tuning-to-a-target.md](references/shared/08-tuning-to-a-target.md) | joseki `difficulty-by-new-patterns-not-numbers`, `no-unfair-loss` |
| 9 | What to do with cards and options that almost nobody uses? | dead cards, situational cards, conditional cards, narrow cards, nobody picks it, pick rate, unused content, unused weapons, 死に札, 条件つきの札, 狭い札, 使われない, 選ばれない, 採用率, 使われない武器 | [references/shared/09-unused-options.md](references/shared/09-unused-options.md) | joseki `risk-and-return`; gene `heir-born-with-traits`, `synergistic-build-items`; search 条件, シナジー |

## Roguelites and deckbuilding roguelikes (`roguelite`)

| # | Question | Also matches | Reference | GameGene entry points |
|---|---|---|---|---|
| 1 | How thick should the deck be, and how easy should removing cards be? | deck thinning, card removal, deck bloat, trimming the deck, デッキ圧縮, 札の除去, デッキが膨らむ, 薄いデッキ | [references/roguelite/01-deck-size.md](references/roguelite/01-deck-size.md) | gene `deck-thinning`, `deck-built-during-play` |
| 2 | How should card rewards be offered, and can the player turn them down? | card draft, reward screen, skipping a reward, what to offer, カード報酬, ドラフト, 報酬を断る, スキップ | [references/roguelite/02-card-rewards.md](references/roguelite/02-card-rewards.md) | joseki `risk-and-return`; gene `deck-built-during-play`, `synergistic-build-items`; search スキップ, 断る |
| 3 | How does the player pay for cards? | energy, mana, action points, resource per turn, エネルギー, マナ, コスト, 手番の資源 | [references/roguelite/03-card-costs.md](references/roguelite/03-card-costs.md) | joseki `risk-and-return`; gene `deck-built-during-play`, `resource-scarcity` |
| 4 | How long should one run be? | session length, run time, pacing, short runs, 1回の長さ, プレイ時間, テンポ, 短いラン | [references/roguelite/04-run-length.md](references/roguelite/04-run-length.md) | joseki `value-the-players-time`; gene `procedural-generation` |
| 5 | What should carry over between runs? | meta progression, unlocks, permanent upgrades, carry-over, 恒久の成長, アンロック, 持ち越し, メタ進行 | [references/roguelite/05-meta-progression.md](references/roguelite/05-meta-progression.md) | gene `meta-progression`, `item-based-power-growth` |
| 6 | Which part of the familiar formula should change? | differentiation, Slay the Spire clone, twist, reskin, 差別化, 二番煎じ, ひねり, 骨格 | [references/roguelite/06-what-to-change.md](references/roguelite/06-what-to-change.md) | gene `deck-built-during-play`; `gamegene_claims` with `gameSlugs` of the games named |
| 7 | How should the hand and the draw pile cycle? | hand size, discard pile, reshuffle, draw pile, retain, keeping the hand between turns, draw as a cost, 手札, 山札, 捨て札, 引き直し, 手札の持ち越し, ドロー, シャッフル | [references/roguelite/07-hand-and-draw.md](references/roguelite/07-hand-and-draw.md) | gene `unshuffled-discard-pile`, `deck-built-during-play` |

## Horror (`horror`)

| # | Question | Also matches | Reference | GameGene entry points |
|---|---|---|---|---|
| 1 | Should the player be able to fight back? | no combat, defenceless, weapons in horror, prey, power fantasy, unkillable monster, 戦えない, 武器なし, 反撃, 獲物, 倒せない敵, 無力さ | [references/horror/01-fight-or-flee.md](references/horror/01-fight-or-flee.md) | gene `flight-and-hide-encounter` |
| 2 | When the player can only run and hide, what should that cost? | stealth, hiding spots, chase, stamina, panic, level loops, escape routes, 隠れる, 逃げる, 追跡, スタミナ, パニック, 逃げ道, 輪の構造 | [references/horror/02-escape-and-hiding.md](references/horror/02-escape-and-hiding.md) | joseki `reduce-output-randomness`; gene `flight-and-hide-encounter` |
| 3 | How do you make the player look at the scary thing instead of avoiding it? | camera combat, looking at the monster, risk for reward, close-range bonus, confronting fear, 射影機, 見据える, 引きつける, 近いほど強い, 恐怖と向き合う | [references/horror/03-facing-the-threat.md](references/horror/03-facing-the-threat.md) | gene `camera-combat` |
| 4 | How should fear be paced so players keep going? | pacing, tension and release, too scary to finish, jump scares, breathing room, intensity curve, 緩急, 怖すぎて進めない, 驚かし, 息抜き, 緊張と緩和, テンポ | [references/horror/04-pacing-fear.md](references/horror/04-pacing-fear.md) | — |
| 5 | Should the monster follow a script or act on its own? | enemy AI, AI director, stalker enemy, patrol routes, unpredictability, scripted scares, 敵の AI, 監督役, 追跡者, 巡回, 予測できない, 台本の驚かし | [references/horror/05-monster-ai.md](references/horror/05-monster-ai.md) | — |
| 6 | Which camera and viewpoint make it scary? | first person vs third person, fixed camera, over-the-shoulder, player body, embodiment, framing, 一人称, 三人称, 固定カメラ, 肩越し, 体の感覚, 画角 | [references/horror/06-camera-and-viewpoint.md](references/horror/06-camera-and-viewpoint.md) | gene `diegetic-interface`, `fixed-camera-framing` |
| 7 | Should saving be safe, scarce or dangerous? | save points, checkpoints, limited saves, ink ribbons, save rooms, autosave, セーブ, チェックポイント, セーブの回数, インクリボン, セーブ部屋, オートセーブ | [references/horror/07-saving.md](references/horror/07-saving.md) | joseki `no-unfair-loss`; gene `resource-scarcity` |
| 8 | Should the player have a companion, and how vulnerable should it be? | escort, companion AI, protecting an NPC, partner, loneliness, 護衛, 相棒, 守る相手, 同行者, 孤独 | [references/horror/08-companions.md](references/horror/08-companions.md) | joseki `no-unfair-loss`; gene `scent-tracking-companion` |
| 9 | Should fear be a stat on the character, like stress or sanity? | sanity meter, stress, morale, afflictions, insanity effects, recovery, 正気度, ストレス, 士気, 発狂, 苦悩, 回復 | [references/horror/09-stress-and-sanity.md](references/horror/09-stress-and-sanity.md) | gene `adventurers-break-under-stress` |
| 10 | How should the story reach the player: found traces, or events happening now? | environmental storytelling, audio logs, found footage, notes, narrative delivery, interface as story, 環境で語る, 日誌, 録音, 映像の断片, 語り方, 検索 | [references/horror/10-telling-the-story.md](references/horror/10-telling-the-story.md) | joseki `imply-dont-simulate`; gene `environmental-storytelling`, `parsed-command-input` |

## About the cases

Each case summary is GameGene's own paraphrase of the cited source, written by its research pipeline with AI assistance. Open the source before relying on a detail.
