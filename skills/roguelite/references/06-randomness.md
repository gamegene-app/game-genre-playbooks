# Where should randomness live?

**Also matches:** RNG, luck, hit chance, input vs output randomness, fairness

**What to weigh:** Randomness before the decision (what you are dealt) gives variety; randomness after it (whether the attack lands) feels unfair.

### Principle: Reduce output randomness

Split luck into input randomness, dealt before the player chooses, and output randomness, which lands between a choice and its result. Output randomness tends to make a loss feel unfair and is the kind to cut first; input randomness tends to read as a problem to solve. Some games keep output randomness on purpose to narrow skill gaps or to add drama.

- Earlier record (2013): [Interview with Keith Burgun](https://indierpgs.com/?p=5139) (indierpgs.com, 2013)
- Popularized (2014): [Randomness and Game Design](https://www.gamedeveloper.com/design/randomness-and-game-design) (Game Developer, 2014)
- GameGene: https://gamegene.app/en/joseki/reduce-output-randomness

### Shipped games that faced this call

#### Dicey Dungeons

Cavanagh found early on that random cards plus random dice felt too chaotic, so he focused on static equipment layouts, with the Jester as the exception. He calls the resulting core sorta like an inversion of RPG combat: you get the RNG up front and decide how to make the best of it.

- Made the same call as this principle, without naming it (GameGene's reading) (`reduce-output-randomness`)
- Source: [Witch-craft: How Dicey Dungeons balances chance and predictability](https://www.gamedeveloper.com/design/witch-craft-how-i-dicey-dungeons-i-balances-chance-and-predictability) (Game Developer (Gamasutra), 2018)
- Source: [Road to the IGF: Cavanagh, Houston, & Dobbe's Dicey Dungeons](https://www.gamedeveloper.com/disciplines/road-to-the-igf-cavanagh-houston-dobbe-s-i-dicey-dungeons-i-) (Game Developer (Gamasutra), 2019)
- GameGene: https://gamegene.app/en/library/records/claims/d1cd84b8-0244-4045-abd5-8c6b20cdd02f

#### Darkest Dungeon II

Tyler Sigman says players disliked missing so much that Red Hook kept raising accuracy. So Darkest Dungeon II dropped accuracy as a stat, so there is no base hit chance: misses remain only as the effect of tokens such as dodge, and dodge and block chances became tokens with fixed effects, such as halving the next hit. Chris Bourassa says this wore down the habit of using damaging attacks all day.

- Made the same call as this principle, without naming it (GameGene's reading) (`reduce-output-randomness`)
- Source: [Darkest Dungeon 2 charts a new path through terror in a roguelike road trip to save humanity](https://www.pcgamer.com/darkest-dungeon-2-charts-a-new-path-through-terror-in-a-roguelike-road-trip-to-save-humanity/) (PC Gamer, 2021)
- GameGene: https://gamegene.app/en/library/records/claims/c65f10b3-584e-49f0-840a-afd46960368c

#### Risk of Rain

Risk of Rain's maps are not procedurally generated: designers hand-craft them, and curated sets of monsters, loot and unlockables are placed into them at random. Paul Morse says this always felt a lot better than something truly random, which at its best can still feel disconnected for the player.

- Source: [Why Risk of Rain Returns is taking the series back to 2D](https://www.gamedeveloper.com/design/risk-of-rain-interview) (Game Developer, 2024)
- GameGene: https://gamegene.app/en/library/records/claims/ed071a4b-b23a-4d15-9496-52815ee552d6

All cases, related games and newer records: the GameGene MCP server (`gamegene_joseki`, `gamegene_claims`).

---

## 日本語

# 運をどこに残すか

**この言葉でも当たる:** 乱数, 運, 命中率, 入力の運と出力の運, 公平

**何を量るか:** 決める前の運 (何が配られるか) は変化になる。決めた後の運 (当たるかどうか) は理不尽に感じられる。

### 定石: 出力の運を減らす

運を、選ぶ前に配られる «入力の運» と、選んだ後で結果との間に入る «出力の運» に分ける。出力の運は負けを不公平に感じさせやすく、減らすならこちらから。入力の運は解く問題として受け取られやすい。腕の差を縮めたい・山場を作りたいときには、あえて出力の運を残す作品もある。

- それより前の記録 (2013): [Interview with Keith Burgun](https://indierpgs.com/?p=5139) (indierpgs.com, 2013)
- 広めた (2014): [Randomness and Game Design](https://www.gamedeveloper.com/design/randomness-and-game-design) (Game Developer, 2014)
- GameGene: https://gamegene.app/joseki/reduce-output-randomness

### この判断をした作品

#### Dicey Dungeons

カヴァナーは、札の運とさいころの運を重ねると混沌としすぎると早くに気づき、装備を固定の配置に絞った (道化師だけは例外)。出来た核を彼は «RPG の戦闘の裏返しのようなもの» と評する。先に乱数を受け取り、それをどう生かすかを決める。

- 名指してはいないが、この定石と同じ判断を語っている (GameGene の読み) (`reduce-output-randomness`)
- 出典: [Witch-craft: How Dicey Dungeons balances chance and predictability](https://www.gamedeveloper.com/design/witch-craft-how-i-dicey-dungeons-i-balances-chance-and-predictability) (Game Developer (Gamasutra), 2018)
- 出典: [Road to the IGF: Cavanagh, Houston, & Dobbe's Dicey Dungeons](https://www.gamedeveloper.com/disciplines/road-to-the-igf-cavanagh-houston-dobbe-s-i-dicey-dungeons-i-) (Game Developer (Gamasutra), 2019)
- GameGene: https://gamegene.app/library/records/claims/d1cd84b8-0244-4045-abd5-8c6b20cdd02f

#### Darkest Dungeon II

タイラー・シグマンは、遊び手が攻撃を外すのをひどく嫌うので命中率を上げる調整を重ねてきたと振り返る。そこで本作は命中率という能力値をなくし、素の確率で外れることはなくした。外れは回避などの札の効き目としてだけ残り、回避や防御の確率は «次の一撃を半分防ぐ» のように効き目の決まった札にまとめた。クリス・ブラッサは、ダメージ技を撃ち続けるだけの癖が薄れたと言う。

- 名指してはいないが、この定石と同じ判断を語っている (GameGene の読み) (`reduce-output-randomness`)
- 出典: [Darkest Dungeon 2 charts a new path through terror in a roguelike road trip to save humanity](https://www.pcgamer.com/darkest-dungeon-2-charts-a-new-path-through-terror-in-a-roguelike-road-trip-to-save-humanity/) (PC Gamer, 2021)
- GameGene: https://gamegene.app/library/records/claims/c65f10b3-584e-49f0-840a-afd46960368c

#### Risk of Rain

『Risk of Rain』の面は自動生成ではなく作り手が手で作り、選び揃えた敵・宝・解放の品を無作為に置く。ポール・モースは、真に無作為なものは良くても遊び手から切り離された感じになりうるとし、こちらのほうがいつもずっと良く感じられたと語る。

- 出典: [Why Risk of Rain Returns is taking the series back to 2D](https://www.gamedeveloper.com/design/risk-of-rain-interview) (Game Developer, 2024)
- GameGene: https://gamegene.app/library/records/claims/ed071a4b-b23a-4d15-9496-52815ee552d6

全部の事例・関連作・新しい記録は GameGene の MCP (`gamegene_joseki`・`gamegene_claims`) で引ける。
