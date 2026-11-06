# How much of the enemy's next move should the player see?

**What to weigh:** Showing intent turns a guess into a solvable problem, but every attack must then stay readable at a glance.

### Principle: Set the information horizon

Decide how far ahead the player can see before new information arrives. Too close and play turns into luck; too far, as in a fully visible board, and it turns into a contest of calculation. Many designs place the horizon one turn or one move ahead.

- Popularized: [Uncapped Look-Ahead and the Information Horizon](https://keithburgun.net/uncapped-look-ahead-and-the-information-horizon/) (keithburgun.net)
- Restated (2010): [Keynote: Everything You Know Is Wrong (GDC 2010)](https://www.youtube.com/watch?v=bY7aRJE-oOY) (GDC)
- GameGene: https://gamegene.app/en/joseki/information-horizon

### Shipped games that faced this call

#### Into the Breach

Justin Ma wanted a game where every death felt like the player's own fault, so Subset cut down randomness and made showing enemy attacks in advance a core mechanic. With every attack visible and no chance in the player's attacks, Ma says, the game starts to feel like a puzzle.

- Made the same call as this principle, without naming it (GameGene's reading) (`information-horizon`)
- Source: [Road to the IGF: Subset Games' Into the Breach](https://www.gamedeveloper.com/game-platforms/road-to-the-igf-subset-games-i-into-the-breach-i-) (Gamasutra (Game Developer), 2018)
- Source: [Everything you need to know about Into the Breach, the next game from the developers of FTL](https://www.pcgamer.com/into-the-breach-preview/) (PC Gamer, 2018)
- GameGene: https://gamegene.app/en/library/records/claims/67f2dabf-d9e8-455e-b86d-9df52eaa9702

#### Slay the Spire

Anthony Giovannetti says enemy intents were not in the original design. Monsters that picked random moves, as in a traditional JRPG, felt too random, so Mega Crit went through several systems with Twitch and YouTube viewers in mind. Knowing how hard an enemy will hit lets the player decide how much to block.

- Source: [MA 8: Anthony Giovannetti on Mastery and Learning through Games](https://maintainersanonymous.com/games/) (Maintainers Anonymous)
- GameGene: https://gamegene.app/en/library/records/claims/cdb7785b-e82b-4f35-804c-ff2867dfe054

#### Into the Breach

Matthew Davis wanted each battle to read like a small chess puzzle, where you can see who attacks whom without checking the pieces. Radius threat ranges on enemy artillery and clover-shaped player weapons made that impossible, so attacks were cut down to straight lines up, down, left or right, and enemy units were kept fixed. Justin Ma says the need for a UI clear at a glance forced the game to be small and simple.

- Source: [Design Lessons from FTL and Into the Breach (TGDF 2018), 8:02-10:21](https://www.youtube.com/watch?v=4LDazcvZwzI&t=482s) (IGDA Taiwan (YouTube))
- Source: [Into the Breach Design Postmortem (GDC 2019), 22:34-24:40](https://www.youtube.com/watch?v=s_I07Iq_2XM&t=1354s) (GDC (YouTube), 2019)
- GameGene: https://gamegene.app/en/library/records/claims/38d1c8c6-b0cd-4fed-81c9-ed89f442b268

All cases, related games and newer records: the GameGene MCP server (`gamegene_joseki`, `gamegene_claims`).

---

## 日本語

# 敵の次の手をどこまで見せるか

**何を量るか:** 次の手を見せると、当て推量が解ける問題に変わる。代わりに、どの攻撃も一目で読めることが要る。

### 定石: 情報の地平線を置く

新しい情報が見えるまでの距離を決める。近すぎると運任せになり、盤面が全部見えるほど遠いと計算の競い合いになる。1手先・1ターン先に置く作りが多い。

- 広めた: [Uncapped Look-Ahead and the Information Horizon](https://keithburgun.net/uncapped-look-ahead-and-the-information-horizon/) (keithburgun.net)
- 言い直した (2010): [Keynote: Everything You Know Is Wrong (GDC 2010)](https://www.youtube.com/watch?v=bY7aRJE-oOY) (GDC)
- GameGene: https://gamegene.app/joseki/information-horizon

### この判断をした作品

#### Into the Breach

ジャスティン・マは、どの死も遊び手自身のせいだと感じられるゲームにしたかった。そこでランダムの要素を減らし、敵の攻撃を前もって見せる形を核の仕組みの1つにした。攻撃が全部見えて自分の攻撃に運が絡まなければ、遊びはパズルのようになるとマは言う。

- 名指してはいないが、この定石と同じ判断を語っている (GameGene の読み) (`information-horizon`)
- 出典: [Road to the IGF: Subset Games' Into the Breach](https://www.gamedeveloper.com/game-platforms/road-to-the-igf-subset-games-i-into-the-breach-i-) (Gamasutra (Game Developer), 2018)
- 出典: [Everything you need to know about Into the Breach, the next game from the developers of FTL](https://www.pcgamer.com/into-the-breach-preview/) (PC Gamer, 2018)
- GameGene: https://gamegene.app/library/records/claims/67f2dabf-d9e8-455e-b86d-9df52eaa9702

#### Slay the Spire

アンソニー・ジョヴァネッティによれば、敵の意図の表示は当初の設計に無かった。昔ながらの JRPG のように敵が無作為に動くと運任せに感じたため、配信で見る人にも伝わる形を考え、いくつもの仕組みを経て今の形に着いた。敵がどれだけ打ってくるか分かれば、どれだけ防ぐかを考えて決められる。

- 出典: [MA 8: Anthony Giovannetti on Mastery and Learning through Games](https://maintainersanonymous.com/games/) (Maintainers Anonymous)
- GameGene: https://gamegene.app/library/records/claims/cdb7785b-e82b-4f35-804c-ff2867dfe054

#### Into the Breach

マシュー・デイヴィスは、駒を確かめなくても誰が誰を撃つか見えるチェスのように、戦闘を小さな詰め問題にしたかった。敵の砲兵の円い射程や自機の四つ葉の形の攻撃ではそれが読めないので、攻撃を上下左右の直線に絞り、敵の性能も固定した。ジャスティン・マも、一目で分かる画面の必要がゲームを小さく単純にしたと語る。

- 出典: [Design Lessons from FTL and Into the Breach (TGDF 2018), 8:02-10:21](https://www.youtube.com/watch?v=4LDazcvZwzI&t=482s) (IGDA Taiwan (YouTube))
- 出典: [Into the Breach Design Postmortem (GDC 2019), 22:34-24:40](https://www.youtube.com/watch?v=s_I07Iq_2XM&t=1354s) (GDC (YouTube), 2019)
- GameGene: https://gamegene.app/library/records/claims/38d1c8c6-b0cd-4fed-81c9-ed89f442b268

全部の事例・関連作・新しい記録は GameGene の MCP (`gamegene_joseki`・`gamegene_claims`) で引ける。
