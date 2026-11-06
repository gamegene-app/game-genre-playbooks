# How should losing feel?

**What to weigh:** Permadeath works when the player can see why they lost; a loss from nowhere makes them quit.

### Principle: Do not make a loss feel unfair

Avoid deaths without warning, dead ends and forced restarts, so that when the player loses, the loss feels like their own doing. Some designs break this on purpose to create tension.

- Earlier record (1988): [Classic Game Postmortem: Loom (GDC 2015)](https://archive.org/details/GDC2015Moriarty?start=1008) (GDC)
- Restated (2017): [Classic Game Postmortem: Deus Ex (GDC 2017)](https://www.youtube.com/watch?v=tffX3VljTtI&t=1103s) (GDC)
- GameGene: https://gamegene.app/en/joseki/no-unfair-loss

### Shipped games that faced this call

#### Darkest Dungeon

Tyler Sigman says that without Death's Door a single crit could kill a hero at two-thirds health, which under permadeath left players either tense all the time or never tense. The team added Death's Door, so one blow cannot kill and there may be a chance to heal the hero before death.

- Made the same call as this principle, without naming it (GameGene's reading) (`no-unfair-loss`)
- Source: [Darkest Dungeon: A Design Postmortem (GDC 2016) 34:22](https://www.youtube.com/watch?v=0IUaGQhlPwo&t=2062s) (GDC)
- GameGene: https://gamegene.app/en/library/records/claims/5c21b99a-4a9a-4d7e-b148-66d8a7601619

#### Into the Breach

Matthew Davis says many players felt FTL's boss came out of nowhere, broke the rules and was unfair, so Into the Breach's final mission asks only for the skills used all game. Separately, since the game is about defense, he says a huge enemy to kill there does not work for most squads, such as one built on freezing.

- Made the same call as this principle, without naming it (GameGene's reading) (`no-unfair-loss`)
- Source: [How Subset Games made the jump from FTL to Into the Breach](https://www.gamedeveloper.com/business/how-subset-games-made-the-jump-from-i-ftl-i-to-i-into-the-breach-i-) (Gamasutra, 2018)
- GameGene: https://gamegene.app/en/library/records/claims/1e5d5f83-e2a7-4b75-be3a-bfcdedcbbd54

#### Noita

Petri Purho says the difference between players hating a permadeath game and blaming themselves "really is almost, I think," how it communicates its emergent systems. Oil making players more flammable confused them until Noita added icons over the player showing which liquid they were covered in; then players began attributing even unimplemented effects to the system.

- Source: [Exploring the Tech and Design of Noita (Petri Purho, GDC talk, from 24:15)](https://www.youtube.com/watch?v=prXuyMCgbTc&t=1455s) (Game Developers Conference)
- Source: [Exploring the Tech and Design of Noita (Petri Purho, GDC talk, from 26:20)](https://www.youtube.com/watch?v=prXuyMCgbTc&t=1580s) (Game Developers Conference)
- GameGene: https://gamegene.app/en/library/records/claims/337abb7a-fe26-4e56-bf42-41b7133ec8c1

### Games that went the other way

#### Darkest Dungeon

Tyler Sigman prefers permissive save systems himself, but the team wanted Darkest Dungeon's players always weighing whether to push a little further. The game saves constantly so actions are permanent, and save scumming takes great lengths.

- Went against this principle (`no-unfair-loss`)
- Source: [Darkest Dungeon: A Design Postmortem (GDC 2016) 22:12](https://www.youtube.com/watch?v=0IUaGQhlPwo&t=1332s) (GDC)
- Source: [Darkest Dungeon: A Design Postmortem (GDC 2016) 32:21](https://www.youtube.com/watch?v=0IUaGQhlPwo&t=1941s) (GDC)
- GameGene: https://gamegene.app/en/library/records/claims/d7f3906b-61ca-4352-a5a1-a8ef635ec88d

All cases, related games and newer records: the GameGene MCP server (`gamegene_joseki`, `gamegene_claims`).

---

## 日本語

# 負けをどう感じさせるか

**何を量るか:** 永久の死が効くのは、なぜ負けたかが見えるとき。どこからともなく来た負けは、遊ぶのをやめさせる。

### 定石: 理不尽に負けさせない

予告なしの死・詰み・やり直しの強制を置かず、負けたときに «自分のせい» と思えるようにする。緊張を生むために、あえてこれを破る作品もある。

- それより前の記録 (1988): [Classic Game Postmortem: Loom (GDC 2015)](https://archive.org/details/GDC2015Moriarty?start=1008) (GDC)
- 言い直した (2017): [Classic Game Postmortem: Deus Ex (GDC 2017)](https://www.youtube.com/watch?v=tffX3VljTtI&t=1103s) (GDC)
- GameGene: https://gamegene.app/joseki/no-unfair-loss

### この判断をした作品

#### Darkest Dungeon

タイラー・シグマンによれば、«死の扉» が無いと体力が3分の2残っていても会心の1発で死ぬことがあり、パーマデスの下では遊び手が «いつも張り詰めるか、まったく張り詰めないか» になった。そこでチームは1撃では死なない «死の扉» を足し、死ぬ前に回復できる見込みを残した。

- 名指してはいないが、この定石と同じ判断を語っている (GameGene の読み) (`no-unfair-loss`)
- 出典: [Darkest Dungeon: A Design Postmortem (GDC 2016) 34:22](https://www.youtube.com/watch?v=0IUaGQhlPwo&t=2062s) (GDC)
- GameGene: https://gamegene.app/library/records/claims/5c21b99a-4a9a-4d7e-b148-66d8a7601619

#### Into the Breach

マシュー・デイヴィスは、FTL のボスが唐突に難しく、規則を破る理不尽なものと受け取られたと振り返る。そこで Into the Breach の最終任務は、それまでと同じ腕だけを求める形にした。これとは別に、守りのゲームなので、凍らせるチームなど多くのチームには最終任務で倒すべき巨大な敵が合わないとも言う。

- 名指してはいないが、この定石と同じ判断を語っている (GameGene の読み) (`no-unfair-loss`)
- 出典: [How Subset Games made the jump from FTL to Into the Breach](https://www.gamedeveloper.com/business/how-subset-games-made-the-jump-from-i-ftl-i-to-i-into-the-breach-i-) (Gamasutra, 2018)
- GameGene: https://gamegene.app/library/records/claims/1e5d5f83-e2a7-4b75-be3a-bfcdedcbbd54

#### Noita

ペトリ・プルホは、パーマデスのゲームを嫌われるか遊び手に自分を責めてもらえるかの差は «ほぼ、伝え方だと思う» と語る。油を浴びると燃えやすくなる効果は分かりにくかったが、浴びた液体を頭上の印で見せると、遊び手は濡れれば感電に弱いといった実装していない効果まで仕組みに帰すようになった。

- 出典: [Exploring the Tech and Design of Noita (Petri Purho, GDC talk, from 24:15)](https://www.youtube.com/watch?v=prXuyMCgbTc&t=1455s) (Game Developers Conference)
- 出典: [Exploring the Tech and Design of Noita (Petri Purho, GDC talk, from 26:20)](https://www.youtube.com/watch?v=prXuyMCgbTc&t=1580s) (Game Developers Conference)
- GameGene: https://gamegene.app/library/records/claims/337abb7a-fe26-4e56-bf42-41b7133ec8c1

### 逆を選んだ作品

#### Darkest Dungeon

タイラー・シグマンは自分では好きにセーブできる作りを好むが、チームはダーケストダンジョンの遊び手に «もう少し先へ進むか» を常に迷わせたかった。そこで絶えず保存して行動を取り消せなくし、セーブのやり直しはひどく手間のかかるものになった。

- この定石の逆を選んだ (`no-unfair-loss`)
- 出典: [Darkest Dungeon: A Design Postmortem (GDC 2016) 22:12](https://www.youtube.com/watch?v=0IUaGQhlPwo&t=1332s) (GDC)
- 出典: [Darkest Dungeon: A Design Postmortem (GDC 2016) 32:21](https://www.youtube.com/watch?v=0IUaGQhlPwo&t=1941s) (GDC)
- GameGene: https://gamegene.app/library/records/claims/d7f3906b-61ca-4352-a5a1-a8ef635ec88d

全部の事例・関連作・新しい記録は GameGene の MCP (`gamegene_joseki`・`gamegene_claims`) で引ける。
