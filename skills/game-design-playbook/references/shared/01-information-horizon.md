# How much of the enemy's next move should the player see?

**Also matches:** enemy intent, telegraphing, attack preview, countdown timers

**What to weigh:** Showing intent turns a guess into a solvable problem, but every attack must then stay readable at a glance.

### Principle: Set the information horizon

Decide how far ahead the player can see before new information arrives. Too close and play turns into luck; too far, as in a fully visible board, and it turns into a contest of calculation. Many designs place the horizon one turn or one move ahead.

- Popularized: [Uncapped Look-Ahead and the Information Horizon](https://keithburgun.net/uncapped-look-ahead-and-the-information-horizon/) (keithburgun.net)
- Restated (2010): [Keynote: Everything You Know Is Wrong (GDC 2010)](https://www.youtube.com/watch?v=bY7aRJE-oOY) (GDC)
- GameGene: https://gamegene.app/en/joseki/information-horizon

### Shipped games that faced this call

#### Into the Breach (roguelite)

Justin Ma wanted a game where every death felt like the player's own fault, so Subset cut down randomness and made showing enemy attacks in advance a core mechanic. With every attack visible and no chance in the player's attacks, Ma says, the game starts to feel like a puzzle.

- Made the same call as this principle, without naming it (GameGene's reading) (`information-horizon`)
- Source: [Road to the IGF: Subset Games' Into the Breach](https://www.gamedeveloper.com/game-platforms/road-to-the-igf-subset-games-i-into-the-breach-i-) (Gamasutra (Game Developer), 2018)
- Source: [Everything you need to know about Into the Breach, the next game from the developers of FTL](https://www.pcgamer.com/into-the-breach-preview/) (PC Gamer, 2018)
- GameGene: https://gamegene.app/en/library/records/claims/67f2dabf-d9e8-455e-b86d-9df52eaa9702

#### Slay the Spire (roguelite)

Anthony Giovannetti says enemy intents were not in the original design. Monsters that picked random moves, as in a traditional JRPG, felt too random, so Mega Crit went through several systems with Twitch and YouTube viewers in mind. Knowing how hard an enemy will hit lets the player decide how much to block.

- Source: [MA 8: Anthony Giovannetti on Mastery and Learning through Games](https://maintainersanonymous.com/games/) (Maintainers Anonymous)
- GameGene: https://gamegene.app/en/library/records/claims/cdb7785b-e82b-4f35-804c-ff2867dfe054

#### Wildfrost (roguelite)

Gaz says the pair kept returning to a dynamic counter system where each action counts as a turn and both sides attack on a turn timer; Will Lewis says a physical card game helped iron out some of it. In a 2022 demo, standard actions removed one counter from every unit, and cards could delay enemies or hasten allies.

- Source: [When We Made… Wildfrost](https://mcvuk.com/business-news/when-we-made-wildfrost/) (MCV/DEVELOP, 2023)
- GameGene: https://gamegene.app/en/library/records/claims/322ea322-114b-4835-8d76-53b17bca7195

All cases, related games and newer records: the GameGene MCP server (`gamegene_joseki`, `gamegene_claims`).

---

## 日本語

# 敵の次の手をどこまで見せるか

**この言葉でも当たる:** 敵の意図, 予告, 次の行動の表示, カウンター

**何を量るか:** 次の手を見せると、当て推量が解ける問題に変わる。代わりに、どの攻撃も一目で読めることが要る。

### 定石: 情報の地平線を置く

新しい情報が見えるまでの距離を決める。近すぎると運任せになり、盤面が全部見えるほど遠いと計算の競い合いになる。1手先・1ターン先に置く作りが多い。

- 広めた: [Uncapped Look-Ahead and the Information Horizon](https://keithburgun.net/uncapped-look-ahead-and-the-information-horizon/) (keithburgun.net)
- 言い直した (2010): [Keynote: Everything You Know Is Wrong (GDC 2010)](https://www.youtube.com/watch?v=bY7aRJE-oOY) (GDC)
- GameGene: https://gamegene.app/joseki/information-horizon

### この判断をした作品

#### Into the Breach (roguelite)

ジャスティン・マは、どの死も遊び手自身のせいだと感じられるゲームにしたかった。そこでランダムの要素を減らし、敵の攻撃を前もって見せる形を核の仕組みの1つにした。攻撃が全部見えて自分の攻撃に運が絡まなければ、遊びはパズルのようになるとマは言う。

- 名指してはいないが、この定石と同じ判断を語っている (GameGene の読み) (`information-horizon`)
- 出典: [Road to the IGF: Subset Games' Into the Breach](https://www.gamedeveloper.com/game-platforms/road-to-the-igf-subset-games-i-into-the-breach-i-) (Gamasutra (Game Developer), 2018)
- 出典: [Everything you need to know about Into the Breach, the next game from the developers of FTL](https://www.pcgamer.com/into-the-breach-preview/) (PC Gamer, 2018)
- GameGene: https://gamegene.app/library/records/claims/67f2dabf-d9e8-455e-b86d-9df52eaa9702

#### Slay the Spire (roguelite)

アンソニー・ジョヴァネッティによれば、敵の意図の表示は当初の設計に無かった。昔ながらの JRPG のように敵が無作為に動くと運任せに感じたため、配信で見る人にも伝わる形を考え、いくつもの仕組みを経て今の形に着いた。敵がどれだけ打ってくるか分かれば、どれだけ防ぐかを考えて決められる。

- 出典: [MA 8: Anthony Giovannetti on Mastery and Learning through Games](https://maintainersanonymous.com/games/) (Maintainers Anonymous)
- GameGene: https://gamegene.app/library/records/claims/cdb7785b-e82b-4f35-804c-ff2867dfe054

#### Wildfrost (roguelite)

ガジターは、行動ひとつが1手になり敵も味方も手数のタイマーで攻撃する «動くカウンター» の案に2人で何度も戻ったと語り、ルイスは紙のカードゲームでその一部を詰めたと語る。2022年の体験版では標準の行動ごとに全ユニットの残り手数が1つ減り、カードで敵を遅らせ味方を早められた。

- 出典: [When We Made… Wildfrost](https://mcvuk.com/business-news/when-we-made-wildfrost/) (MCV/DEVELOP, 2023)
- GameGene: https://gamegene.app/library/records/claims/322ea322-114b-4835-8d76-53b17bca7195

全部の事例・関連作・新しい記録は GameGene の MCP (`gamegene_joseki`・`gamegene_claims`) で引ける。
