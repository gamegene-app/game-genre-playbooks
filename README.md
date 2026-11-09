# game-genre-playbooks

[![Genres: 3 + shared](https://img.shields.io/badge/genres-3%20%2B%20shared-2ea043)](#genres)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Data: GameGene](https://img.shields.io/badge/data-GameGene-c8553d)](https://gamegene.app/about)
[![Connect the GameGene MCP](https://img.shields.io/badge/MCP-connect%20GameGene-6e56cf)](https://gamegene.app/mcp)
[![mcptry](https://mcptry.com/badge/app.gamegene/gamegene)](https://mcptry.com/servers/app.gamegene/gamegene)
[![GameGene MCP connector – tool definition quality and endpoint health on Glama](https://glama.ai/mcp/connectors/app.gamegene/gamegene/badges/score.svg)](https://glama.ai/mcp/connectors/app.gamegene/gamegene)

**Stuck on a design call in your genre? Get the answer other developers in that genre gave, and what it cost them.**

Making a game in a crowded genre means making the same calls again and again. Should a card that never gets stronger be retuned or cut? How much of the next fight should the player see? Is my twist new, or a reskin? An AI assistant will give you a sensible general answer. What you usually need is something else: which shipped games faced the same call, what their developers chose, why, and what they gave up.

This playbook gives your AI agent (Claude Code, Codex, Cursor and others that read skills) exactly that, with every case traced to a talk, interview or postmortem. It is one skill in two layers: design calls that cross genres, and the calls specific to each genre.

## Install

Copy the playbook folder into your agent's skills folder. For Claude Code:

```bash
git clone https://github.com/gamegene-app/game-genre-playbooks.git
cp -R game-genre-playbooks/skills/game-design-playbook ~/.claude/skills/game-design-playbook
```

To use it in one project only, copy it into that project's `.claude/skills/` instead:

```bash
cp -R game-genre-playbooks/skills/game-design-playbook <your-project>/.claude/skills/game-design-playbook
```

Other agents that read `SKILL.md` folders (Codex, Cursor and others) take the same folder. Then ask your agent about a design call, for example "Should my deckbuilder let players skip card rewards?" "Should the player in my horror game be able to fight back?" or "Should my life sim run on the real clock?" If your project's CLAUDE.md or README names the genre, the agent picks the genre's questions from there.

**Upgrading from the roguelite playbook.** Until 8 November 2026 this repository shipped `skills/roguelite`, installed as `roguelite-playbook`. Its 16 questions are all in `game-design-playbook` now: 9 moved to the shared layer and 7 stayed in the roguelite layer. Delete the old folder (`rm -rf ~/.claude/skills/roguelite-playbook`) so the agent does not see both.

## What a game maker gets

From a solo developer who used the roguelite playbook on their own deckbuilder ([full write-up](../../issues/2)):

- **Less time going in circles.** A card that numbers could not fix stopped being an endless tuning loop once the answer came back that Balatro's developer cut cards more often than he retuned them.
- **The cost of the road not taken, before you build it.** Into the Breach's cap on battle length came with its downside: it keeps fights moving, and it punishes slow, careful play.
- **A reason you can point to.** Each decision rests on a named game, a named developer and a source, so you can explain it to your team, a publisher, players, or your future self.
- **"Not on record" is an answer too.** When nothing is recorded, the playbook says so instead of inventing a case. That marks the spot you will have to test yourself, and maybe where you are doing something new.
- **Words for your game's core.** Principles such as "information horizon" and "input vs output randomness" turn a hunch about why your battles work into something you can write in a design doc.
- **No digging.** You do not have to hunt through talks and postmortems. Ask in your own language; the agent picks up the playbook without being told its name.

The playbook adds sourced precedents to a decision. Your own playtests and numbers still decide it.

## Does it help? (measured)

The same developer had Claude Code answer 10 design questions from their project, 3 times each, under each condition. A separate Claude graded the answers without knowing the condition ([method and details](../../issues/3)).

| Condition | Score (0–1) |
|---|---|
| No playbook, no GameGene | 0.31 |
| GameGene MCP only | 0.74 |
| This playbook | 0.92 |
| This playbook + GameGene MCP | 0.94 |

- Without a source of precedents, every precedent-related item scored zero
- The playbook alone used about half the tokens of the MCP alone
- No condition produced an invented precedent in the graded answers

The grader is the same model family as the answerer and each condition has 30 answers, so read the numbers as a rough guide. The two playbook rows are the current SKILL.md, measured in a second run on the same questions; the other two rows are from the first run.

After the playbook was split into a shared layer and genre layers (8 November 2026), we re-ran the [eval kit](eval/) without a project, from empty folders, playbook only (no MCP), 3 answers per question:

| Questions | Before the split | After the split |
|---|---|---|
| 12 roguelite questions | 0.94 | 0.95 |

And the new horror layer, 10 horror questions × 2 answers each:

| Condition | Score (0–1) | Blind ranking (1 = best) |
|---|---|---|
| No playbook, no GameGene | 0.56 | 2.0 |
| This playbook | 0.94 | 1.0 (first on all 10 questions) |

And the cozy layer (9 November 2026), 9 cozy and life-sim questions × 2 answers each:

| Condition | Score (0–1) | Blind ranking (1 = best) |
|---|---|---|
| No playbook, no GameGene | 0.42 | 2.0 |
| This playbook | 0.92 | 1.0 (first on all 9 questions) |

No invented precedent was found in any of these answers either. Same caveats as above: same-family grader, small numbers.

## Genres

All in one skill, [`game-design-playbook`](skills/game-design-playbook/SKILL.md):

| Layer | Questions | Examples |
|---|---|---|
| **Any genre** (shared) | 10 | how much of the enemy's next move to show, where randomness lives, how losing feels, difficulty tiers, stalemates, options nobody uses, teaching without a tutorial |
| **Roguelites**, including deckbuilding roguelikes | 7 | deck size and card removal, card rewards, run length, meta progression, what to change from Slay the Spire |
| **Horror** | 10 | whether the player can fight back, what escaping and hiding cost, pacing fear, monster AI, camera, saving, sanity |
| **Cozy games and life sims** | 9 | the game clock, a calendar of limited days, relationships, playing together apart, coming back daily, endings, pets, low stakes |

Roguelites came first because the records are thickest there; horror second, because its developers' own statements are nearly as many; then cozy games and life sims. The cozy layer has no farming game yet (Stardew Valley and Harvest Moon / Story of Seasons are not on GameGene's records), so farming decisions are listed as "not on record yet" in its references. A genre is scoped by GameGene's game tags, and each case in the shared layer is labelled with its game's genres, so the agent can prefer a precedent from your genre and still reach across genres. More genres are added once their records are complete enough; the next candidate is puzzle games.

## Where the data comes from

Everything here is generated from [**GameGene**](https://gamegene.app/about), a sourced database of game design lineage. GameGene records where a mechanic came from and where it went, in the developers' own words, and keeps a developer's statement apart from a critic's reading.

The playbook carries the questions, the principles and a few hand-picked cases for each. For the full set of cases, records that arrived after the last update, and games in other genres, connect the [**GameGene MCP server**](https://gamegene.app/mcp) to your AI app (a free account is enough).

## Requests

| What you want | Where to ask |
|---|---|
| A new **genre** playbook | [Open an issue here](../../issues/new?template=genre-request.yml) |
| A new **design question** or viewpoint for an existing genre | [Open an issue here](../../issues/new?template=viewpoint-request.yml) |
| A specific **game**, or a **research question** about one | [Send a research request on GameGene](https://gamegene.app/feedback?panel=submit). It goes straight into GameGene's research queue, so it is usually handled sooner than an issue here, and the result reaches every playbook that uses it |

## How it works

The playbooks are generated from GameGene's database, without an LLM, and committed here only when something changed. No skill in this repository calls the network on its own.

With the GameGene MCP server connected, the playbook tells your agent to use it for two things only: filling a question's "not on record yet" gaps, and finding games in other genres that share the same mechanism. Each question lists GameGene entry points (principle and gene slugs), so the agent can go straight to the records instead of searching.

---

## 日本語

**ジャンルの設計判断で迷ったら、同じジャンルの作り手が出した答えと、その代償を手元に。**

人の多いジャンルでは、同じ判断を何度も迫られます。数値を直しても強くならない札は、直すか外すか。次の戦いをどこまで見せるか。自分のひねりは新しいのか、見た目を替えただけか。AI に聞けば一般論は返ってきます。けれど本当に要るのは、同じ判断をした作品と、その作り手が何を選び、なぜそうし、何を捨てたかです。この作戦帳は、それを講演・インタビュー・ポストモーテムの出典つきで AI に渡します。ジャンルをまたぐ判断の層と、ジャンルごとの判断の層の2段でできた、1つのスキルです。

### 作り手が受け取るもの

自分のデッキ構築ローグライクで使い込んだソロ開発者の声から（[全文](../../issues/2)）:

- **堂々巡りが短くなる。** 数値を直しても強くならない札に悩んでいたとき、«Balatro の作り手は数値を直すより外すことが多かった» と返ってきて、直すか外すかを1枚ずつ決める方針に切り替えられた
- **選ばなかった案の代償が、作る前に分かる。** Into the Breach が戦闘に上限を置いた判断は、«戦いは進むが、慎重に遊ぶ人を罰する» という代償と一緒に届いた
- **決めた理由を人に説明できる。** 作品・作り手・出典を指せるので、チームやパブリッシャー、遊ぶ人、未来の自分に話せる
- **«記録が無い» も答えになる。** 作り話をせず «まだ記録に無い» と言うので、そこが自分で確かめる場所だと分かる
- **自分のゲームの芯を言葉にできる。** «情報の地平線» «入力の運と出力の運» のような定石の言葉で、なぜ面白いのかを設計書に書ける
- **調べ物が要らない。** 日本語で相談するだけで、スキル名を出さなくても前例が添えられる

最後に決めるのは、自分のゲームの試遊と数字です。作戦帳はその判断に出典つきの前例を添えます。

### 効果の計測

同じ開発者が、自分のゲームの設計判断10問を各条件で3回ずつ答えさせ、条件を伏せて別の Claude に採点させました（[方法と詳細](../../issues/3)）。前例の情報源が無いと 0.31、GameGene MCP だけで 0.74、この作戦帳で 0.92、作戦帳と MCP で 0.94 でした。作戦帳だけのときのトークンは MCP だけのときの半分ほどで、どの条件でも作り話の前例は出ませんでした。採点者は答える側と同じ系統のモデルで、1条件30回答の規模なので、目安として読んでください。作戦帳の2行は今の SKILL.md を同じ問いで測り直した値で、ほかの2行は最初の計測の値です。

共通の層とジャンルの層に分けた後（2026年11月8日）、[評価キット](eval/)で空のフォルダから作戦帳だけ（MCP なし）を測り直しました。ローグライトの12問（各3回）は分ける前 0.94、分けた後 0.95。新しいホラーの層は、ホラーの10問（各2回）で作戦帳なし 0.56、作戦帳あり 0.94 で、条件を伏せた順位づけでは10問すべてで作戦帳ありが1位でした。コージー・生活シミュの層（2026年11月9日）は9問（各2回）で作戦帳なし 0.42、作戦帳あり 0.92、順位は9問すべてで作戦帳ありが1位でした。どの回答にも作り話の前例はありませんでした。

### 入れ方と依頼

- 入れ方は上の Install。`skills/game-design-playbook` を `~/.claude/skills/` へ写す（1つのプロジェクトだけなら `<プロジェクト>/.claude/skills/` へ）
- 中身は [`game-design-playbook`](skills/game-design-playbook/SKILL.md) の1つで、ジャンルをまたぐ問い10本・ローグライト（デッキ構築ローグライクを含む）7本・ホラー10本・コージー・生活シミュ9本。ジャンルの範囲は GameGene の作品のタグで切る。コージーの層には農場ものがまだ無い（Stardew Valley・牧場物語は GameGene に未収録）。次の候補はパズル
- 2026年11月8日までの `skills/roguelite`（`roguelite-playbook` として入れたもの）は、16問すべてがこのスキルに入った（9問は共通の層へ、7問はローグライトの層へ）。古いフォルダは消す（`rm -rf ~/.claude/skills/roguelite-playbook`）
- データの出どころは [GameGene](https://gamegene.app/about)。全部の事例と出典は [GameGene MCP](https://gamegene.app/mcp)（無料のアカウントで使えます）で引ける
- 新しいジャンルや観点の依頼は、このリポジトリの Issue へ。個別の作品や調査の依頼は [GameGene の調査依頼](https://gamegene.app/feedback?panel=submit) へ（GameGene の調査の順番に直接入るので、こちらのほうが早い）

## License

MIT
