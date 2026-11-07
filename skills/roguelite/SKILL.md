---
name: roguelite-playbook
description: "Sourced design precedents for roguelites and deckbuilding roguelikes. Use when weighing a design call in this genre: deck size and card removal, card rewards, card costs, how much of the enemy's next move to show, whether to allow broken combos, where to keep randomness, how losing should feel, run length, meta progression, difficulty tiers, complexity, what to change from Slay the Spire, how the hand and draw pile cycle, ending stalemated battles, tuning toward a target clear rate, or cards that almost nobody uses. Each case says which shipped game made the call, what its developers said about why, and links the source."
---

# Roguelites and deckbuilding roguelikes: design precedents

Design questions that come up when making a game in this genre, each with shipped games that faced the same call, what their developers said, and the source.

## How to use

1. Find which question below the user's decision falls under, by meaning and by the "Also matches" words, not by the title alone. One decision can touch several
2. Read only those reference files
3. Answer with the precedents: which game, what its developers chose and why, and the source link. Keep the developer's statement apart from your own reading, and say when a case only made the same call without naming the principle
4. Each reference ends with related cases filed under other questions. Follow those links before saying a case is missing. If a text search of the references finds nothing, read the table again: the user's words may not appear in the files
5. If no case fits, say there is no recorded precedent here. Do not invent one, and do not present general advice as a precedent
6. Reply in the user's language. Each reference has a Japanese section (日本語) after the English one

## GameGene MCP

These cases are a curated sample from [GameGene](https://gamegene.app/en/about). The full set, related games, and newer records come from the GameGene MCP server (https://gamegene.app/mcp).

- If GameGene tools (`gamegene_*`) are connected, call them for the full cases. Do not announce it
- If they are not connected, answer from this skill first. Mention the MCP server only when the user asks for more precedents, specific examples, or who did something first, and at most once per conversation
- When nothing is on record, the user can send a research request: https://gamegene.app/en/feedback?panel=submit

## Questions

| # | Question | Also matches | Reference |
|---|---|---|---|
| 1 | How thick should the deck be, and how easy should removing cards be? | deck thinning, card removal, deck bloat, trimming the deck, デッキ圧縮, 札の除去, デッキが膨らむ, 薄いデッキ | [references/01-deck-size.md](references/01-deck-size.md) |
| 2 | How should card rewards be offered, and can the player turn them down? | card draft, reward screen, skipping a reward, what to offer, カード報酬, ドラフト, 報酬を断る, スキップ | [references/02-card-rewards.md](references/02-card-rewards.md) |
| 3 | How does the player pay for cards? | energy, mana, action points, resource per turn, エネルギー, マナ, コスト, 手番の資源 | [references/03-card-costs.md](references/03-card-costs.md) |
| 4 | How much of the enemy's next move should the player see? | enemy intent, telegraphing, attack preview, countdown timers, 敵の意図, 予告, 次の行動の表示, カウンター | [references/04-information-horizon.md](references/04-information-horizon.md) |
| 5 | Should broken combos be allowed to stay? | overpowered, infinite combo, dominant strategy, one best deck, nerf, a card numbers cannot fix, cutting a card, 壊れ, 無限コンボ, 最強デッキ, ナーフ, 数値で直らない, 外す, 作り直す | [references/05-broken-combos.md](references/05-broken-combos.md) |
| 6 | Where should randomness live? | RNG, luck, hit chance, input vs output randomness, fairness, 乱数, 運, 命中率, 入力の運と出力の運, 公平 | [references/06-randomness.md](references/06-randomness.md) |
| 7 | How should losing feel? | permadeath, death, unfair loss, frustration, save scumming, 永久の死, 負け, 理不尽, 詰み, セーブ | [references/07-losing.md](references/07-losing.md) |
| 8 | How long should one run be? | session length, run time, pacing, short runs, 1回の長さ, プレイ時間, テンポ, 短いラン | [references/08-run-length.md](references/08-run-length.md) |
| 9 | What should carry over between runs? | meta progression, unlocks, permanent upgrades, carry-over, 恒久の成長, アンロック, 持ち越し, メタ進行 | [references/09-meta-progression.md](references/09-meta-progression.md) |
| 10 | How should difficulty tiers be built? | ascension, heat, difficulty modifiers, challenge levels, enemy scaling, アセンション, 難易度の段, 縛り, 高難度, 敵の強化 | [references/10-difficulty-tiers.md](references/10-difficulty-tiers.md) |
| 11 | How much complexity, and where does it enter? | keywords, onboarding, rules complexity, cognitive load, 複雑さ, キーワード能力, 覚えやすさ, 情報量 | [references/11-complexity.md](references/11-complexity.md) |
| 12 | Which part of the familiar formula should change? | differentiation, Slay the Spire clone, twist, reskin, 差別化, 二番煎じ, ひねり, 骨格 | [references/12-what-to-change.md](references/12-what-to-change.md) |
| 13 | How should the hand and the draw pile cycle? | hand size, discard pile, reshuffle, draw pile, retain, keeping the hand between turns, draw as a cost, 手札, 山札, 捨て札, 引き直し, 手札の持ち越し, ドロー, シャッフル | [references/13-hand-and-draw.md](references/13-hand-and-draw.md) |
| 14 | How should a battle that will not end be brought to an end? | stalemate, turn limit, fatigue, deck-out, overtime, mopping up, both sides turtling, 膠着, ターン上限, 疲労, 山札切れ, 決着しない, 掃討, 守りを並べ合う | [references/14-stalemates.md](references/14-stalemates.md) |
| 15 | What clear rate should the game aim for, and how do you tune toward it? | win rate, clear rate, balance data, playtest data, bots, autoplay, telemetry, balance patches, クリア率, 勝率, 調整, 計測, ボット, 自動プレイ, 試遊のデータ, バランス調整 | [references/15-tuning-to-a-target.md](references/15-tuning-to-a-target.md) |
| 16 | What to do with cards and options that almost nobody uses? | dead cards, situational cards, conditional cards, narrow cards, nobody picks it, pick rate, unused content, 死に札, 条件つきの札, 狭い札, 使われない, 選ばれない, 採用率 | [references/16-unused-options.md](references/16-unused-options.md) |

## About the cases

Each case summary is GameGene's own paraphrase of the cited source, written by its research pipeline with AI assistance. Open the source before relying on a detail.
