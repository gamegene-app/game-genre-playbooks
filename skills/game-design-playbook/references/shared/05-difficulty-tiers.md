# How should difficulty tiers be built?

**Also matches:** ascension, heat, difficulty modifiers, difficulty modes, challenge levels, enemy scaling

**What to weigh:** Tiers on top of a balanced base keep veterans playing; how each tier raises the challenge decides whether it stays interesting.

### Principle: Raise difficulty with new patterns and speed, not inflated numbers

Raise difficulty by giving the player something new to adapt to, such as faster attacks, new patterns, fewer defensive options or changed goals, rather than by inflating enemy health and damage. Inflated numbers only make punishment heavier. Some designs raise numbers on purpose, with time or with the number of fights, to keep the player from feeling safe.

- Restated (2011): [Tuning the Muzzle Velocity of the Plasma Rifle Bolt on Legendary Difficulty in HALO (GDC 2011)](https://www.youtube.com/watch?v=ikvheFiDsYY) (Game Developers Conference, 2019)
- Restated (2021): [Honoring the Blade: Lethality and Combat Balance in 'Ghost of Tsushima' (GDC 2021)](https://www.youtube.com/watch?v=dKS2kaI3aXE) (Game Developers Conference, 2021)
- GameGene: https://gamegene.app/en/joseki/difficulty-by-new-patterns-not-numbers

### Shipped games that faced this call

#### Slay the Spire (roguelite)

Anthony Giovannetti saw handling several difficulty modes as a balance problem. Mega Crit balanced the game primarily around the base difficulty and built Ascension on top of it during early access; by his 2019 talk it had 20 levels that unlock one at a time, so players climb as their skill improves and settle where it suits them. He says sorting play data by level turned that problem into a strength.

- Source: [Slay the Spire 2 is cooking a "competitive" mode, but I'm most excited about its new short-time format](https://www.pcgamesn.com/slay-the-spire-2/new-modes) (PCGamesN, 2026)
- Source: [Slay the Spire: Metrics Driven Design and Balance (GDC 2019, ascension levels)](https://www.youtube.com/watch?v=7rqfbvnO_H0&t=857s) (Game Developers Conference, 2019)
- GameGene: https://gamegene.app/en/library/records/claims/d4c1eef9-8303-4511-9362-d12b4198b127

#### Hades (roguelite)

In its 2018 FAQ, Supergiant said challenge is relative from player to player and listed the Pact of Punishment among its difficulty modifiers. In 2020 Greg Kasavin said the Pact's Extreme Measures condition transforms every boss fight, restructuring the gameplay and often adding new story events; the patch notes say it affects bosses region by region.

- Made the same call as this principle, without naming it (GameGene's reading) (`difficulty-by-new-patterns-not-numbers`)
- Source: [Hades Interview: Creative Director Greg Kasavin Dives into Development at Supergiant Games](https://gamerant.com/hades-interview-early-access-release-dlc-covid/) (Game Rant, 2020)
- Source: [Hades FAQ](https://www.supergiantgames.com/blog/hades-faq) (Supergiant Games, 2018)
- GameGene: https://gamegene.app/en/library/records/claims/43e07bf9-87d3-41f2-9a4e-a66e5c743137

#### Rogue Legacy 2 (roguelite)

Teddy Lee likes hard games, but knew many people may not want or be able to play at that level, so he added House Rules, which let players change enemy health and damage, turn off contact damage, or fly. To remove the stigma, using them does not disable achievements; it grants one.

- Source: [Rogue Legacy 2 Lead Designer Discusses 1.0 Release, Classes, and More](https://gamerant.com/rogue-legacy-2-release-update-classes-platforms-interview/) (Game Rant, 2022)
- GameGene: https://gamegene.app/en/library/records/claims/1d7b8981-6109-407f-8f39-c9562c53612a

### Games that went the other way

#### Risk of Rain (roguelite)

In Risk of Rain, enemies grow harder the longer a run lasts. Hopoo Games calls this timed difficulty core to a game in which the player never feels safe, with a constant balancing act between taking time to gather items and racing the timer to stay ahead of the difficulty curve.

- Went against this principle (`difficulty-by-new-patterns-not-numbers`)
- Source: [Hopoo Games Interview: Devs Talk All Things Risk of Rain Returns](https://gamerant.com/risk-rain-returns-remake-interview/) (Game Rant, 2023)
- Source: [Why Risk of Rain Returns is taking the series back to 2D](https://www.gamedeveloper.com/design/risk-of-rain-interview) (Game Developer, 2024)
- GameGene: https://gamegene.app/en/library/records/claims/42107b89-51b3-4dab-af28-ef6be1d4ffab

#### Diablo (horror)

David Brevik disliked how some roguelikes end when you kill the boss. He says Diablo's multiple difficulty levels were meant to extend the gameplay, making the same content last far longer with no new levels and little art, and that extending the gameplay was intended from the very beginning.

- Went against this principle (`difficulty-by-new-patterns-not-numbers`)
- Source: [Classic Game Postmortem: Diablo (GDC 2016)](https://archive.org/details/GDC2016Brevik?start=3757) (Game Developers Conference)
- Source: [Classic Game Postmortem: Diablo (GDC 2016)](https://archive.org/details/GDC2016Brevik?start=3878) (Game Developers Conference)
- GameGene: https://gamegene.app/en/library/records/claims/558f819d-2ac0-4b27-9fae-9de17ce4acc0

### Related cases filed under other questions

- Luck be a Landlord: moved the harsher settings the developer liked into higher tiers instead of imposing them on everyone → [roguelite 01 How thick should the deck be, and how easy should removing cards be?](../roguelite/01-deck-size.md)

### Not on record yet

- Why a developer chose to raise difficulty by changing patterns or rules rather than numbers, and what they dropped (Hades shows the what, not yet the why)

Ask GameGene to research it: https://gamegene.app/en/feedback?panel=submit

All cases, related games and newer records: the GameGene MCP server (`gamegene_joseki`, `gamegene_claims`).

---

## 日本語

# 難度の段をどう積むか

**この言葉でも当たる:** アセンション, 難易度の段, 難易度の選択, 縛り, 高難度, 敵の強化

**何を量るか:** 釣り合いを取った基本の上に段を積むと、慣れた遊び手が残る。段ごとに何を厳しくするかで、面白さが続くかが決まる。

### 定石: 難しさは数値の水増しでなく、新しい型と速さで上げる

敵の体力や攻撃力を水増しして難しくせず、遊び手が適応する新しいものを渡して上げる。速い攻撃、新しい型、防御の手を減らす、目標を変える、などである。数値の水増しは罰を重くするだけになりやすい。遊び手に安心させないため、時間や戦った回数で数値をあえて上げる作品もある。

- 言い直した (2011): [Tuning the Muzzle Velocity of the Plasma Rifle Bolt on Legendary Difficulty in HALO (GDC 2011)](https://www.youtube.com/watch?v=ikvheFiDsYY) (Game Developers Conference, 2019)
- 言い直した (2021): [Honoring the Blade: Lethality and Combat Balance in 'Ghost of Tsushima' (GDC 2021)](https://www.youtube.com/watch?v=dKS2kaI3aXE) (Game Developers Conference, 2021)
- GameGene: https://gamegene.app/joseki/difficulty-by-new-patterns-not-numbers

### この判断をした作品

#### Slay the Spire (roguelite)

アンソニー・ジョヴァネッティは難易度の段の扱いを釣り合いの難所と見る。釣り合いは主に基本の難しさで取り、その上に早期アクセスの間に作ったアセンションを置いた。講演の時点で20段あり、1段ずつ開くので、腕が上がるほど遊び手は段を登り、自分に合う段に落ち着く。段ごとの記録で調整もでき、難所が強みに変わったと語る。

- 出典: [Slay the Spire 2 is cooking a "competitive" mode, but I'm most excited about its new short-time format](https://www.pcgamesn.com/slay-the-spire-2/new-modes) (PCGamesN, 2026)
- 出典: [Slay the Spire: Metrics Driven Design and Balance (GDC 2019, ascension levels)](https://www.youtube.com/watch?v=7rqfbvnO_H0&t=857s) (Game Developers Conference, 2019)
- GameGene: https://gamegene.app/library/records/claims/d4c1eef9-8303-4511-9362-d12b4198b127

#### Hades (roguelite)

Supergiant は2018年の FAQ で、挑戦の重さは遊び手ごとに違うとして難しさを変える手段を挙げ、罰の契約もその一つに数えた。カサヴィンは2020年、契約の条件 Extreme Measures がどのボス戦も大きく変え、戦い方を組み直し、新しい物語の出来事も足すことが多いと語った。パッチノートは地域ごとのボスに効くと書く。

- 名指してはいないが、この定石と同じ判断を語っている (GameGene の読み) (`difficulty-by-new-patterns-not-numbers`)
- 出典: [Hades Interview: Creative Director Greg Kasavin Dives into Development at Supergiant Games](https://gamerant.com/hades-interview-early-access-release-dlc-covid/) (Game Rant, 2020)
- 出典: [Hades FAQ](https://www.supergiantgames.com/blog/hades-faq) (Supergiant Games, 2018)
- GameGene: https://gamegene.app/library/records/claims/43e07bf9-87d3-41f2-9a4e-a66e5c743137

#### Rogue Legacy 2 (roguelite)

テディ・リーは難しいゲームが好きだが、その水準で遊びたくない人や遊べない人も多いと考え、敵の体力や与えるダメージを変えたり、接触ダメージを切ったり空を飛べたりする «ハウスルール» を入れた。使う後ろめたさを消すため、実績を止めず、逆に使うと実績を与えた。

- 出典: [Rogue Legacy 2 Lead Designer Discusses 1.0 Release, Classes, and More](https://gamerant.com/rogue-legacy-2-release-update-classes-platforms-interview/) (Game Rant, 2022)
- GameGene: https://gamegene.app/library/records/claims/1d7b8981-6109-407f-8f39-c9562c53612a

### 逆を選んだ作品

#### Risk of Rain (roguelite)

『Risk of Rain』では、周回が長引くほど敵が手強くなる。Hopoo Games はこの時間で上がる難しさを、遊び手が決して安心できない遊びの芯と語る。アイテムを集めて力をつける時間を取るか、難しさの曲線に先んじるようタイマーと競うかの釣り合いを、遊び手は常に取らされる。

- この定石の逆を選んだ (`difficulty-by-new-patterns-not-numbers`)
- 出典: [Hopoo Games Interview: Devs Talk All Things Risk of Rain Returns](https://gamerant.com/risk-rain-returns-remake-interview/) (Game Rant, 2023)
- 出典: [Why Risk of Rain Returns is taking the series back to 2D](https://www.gamedeveloper.com/design/risk-of-rain-interview) (Game Developer, 2024)
- GameGene: https://gamegene.app/library/records/claims/42107b89-51b3-4dab-af28-ef6be1d4ffab

#### Diablo (horror)

ブレヴィックは、ボスを倒すとそこで終わる一部のローグライクを好まなかった。ディアブロの複数の難易度は遊ぶ期間を延ばすためのもので、新しい階を作らず絵の手間もほとんどかけずに同じ中身を長く遊べた。遊ぶ期間を延ばすことは最初からの狙いだったと語る。

- この定石の逆を選んだ (`difficulty-by-new-patterns-not-numbers`)
- 出典: [Classic Game Postmortem: Diablo (GDC 2016)](https://archive.org/details/GDC2016Brevik?start=3757) (Game Developers Conference)
- 出典: [Classic Game Postmortem: Diablo (GDC 2016)](https://archive.org/details/GDC2016Brevik?start=3878) (Game Developers Conference)
- GameGene: https://gamegene.app/library/records/claims/558f819d-2ac0-4b27-9fae-9de17ce4acc0

### ほかの問いに置いた関係する事例

- Luck be a Landlord: 作り手の好んだ厳しい設定を、全員には課さず上の段へ移した → [roguelite 01 デッキの厚さと、札を取り除く手段をどこまで用意するか](../roguelite/01-deck-size.md)

### まだ記録に無いもの

- 難度を数値でなく型 (敵の種類・規則) で上げると決めた理由と、捨てた案 (Hades は «何を» までで、«なぜ» はまだ)

GameGene に調査を依頼する: https://gamegene.app/feedback?panel=submit

全部の事例・関連作・新しい記録は GameGene の MCP (`gamegene_joseki`・`gamegene_claims`) で引ける。
