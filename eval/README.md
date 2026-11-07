# Playbook eval kit

Measures how much a genre playbook skill (and the GameGene MCP server) improves an AI assistant's answers to design questions, using the same questions and the same rubric every time. Re-run it whenever a playbook is regenerated and compare against the previous run.

[日本語は下にあります](#日本語)

## Files

| File | What it does |
|---|---|
| `questions/roguelite.json` | 12 genre-level design questions for the roguelite playbook, each in Japanese and English. Per question: `goldQuestions` (playbook question numbers a good answer should land on), `goldCases` (cases the playbook holds for them), `expectGap` (what the playbook lists as not on record). The last one is a control question with no matching reference |
| `run.mjs` | Answers questions × conditions × reps with headless `claude -p`, and records which skill, MCP tools and playbook files each answer used |
| `judge.mjs` | Scores each answer against the rubric with `claude -p` as judge. The judge has no tools, skill or MCP; it gets the reference files for the gold questions so it can check what an answer attributes to the playbook |
| `rank.mjs` | Ranks the answers to the same question side by side, blind and shuffled, and asks which precedents the judge wished any answer had found |
| `summarize.mjs` | Writes per-condition and per-question tables to `runs/<runId>/summary.md` |
| `lib.mjs` | Config, conditions, workspaces, launching `claude -p`, rubric |
| `variants/` | Trial `SKILL.md` versions to compare against the playbook's own (see `variants/README.md`) |

## Conditions

Conditions are switched by launch flags, not by the prompt, so the answering model does not know which condition it is in.

| Condition | Playbook skill | GameGene MCP |
|---|---|---|
| A | yes | no |
| B | yes | yes |
| C | no | yes |
| D | no | no |
| A-`<variant>`, B-`<variant>` | trial `SKILL.md` from `variants/<variant>/` | as A / B |

How each condition is isolated:

- Every condition answers from **its own empty temp folder** (`<tmp>/playbook-eval/<runId>/<cond>/`). Skill conditions get only `.claude/skills/<skill>/` (a copy of the playbook, or the playbook with a variant `SKILL.md`); C and D get nothing, so the playbook cannot be found by searching the project.
- Every condition **denies reading** the kit folder (it holds the gold notes and earlier answers) and the playbook's source folder (so C and D cannot read it by absolute path).
- C and D also turn the skill off with `skillOverrides`, in case a copy is installed at user level or as a plugin.
- A and D turn GameGene off with `disableClaudeAiConnectors` (GameGene is a claude.ai connector). B and C pre-approve its tools, since a headless run cannot answer a permission prompt. If your connectors are named differently, set `GAMEGENE_SERVERS` (comma-separated, default `mcp__claude_ai_GameGene,mcp__claude_ai_GameGeneStg`).
- No condition may use web search or fetch, edits, shells or subagents.
- Any use of a source a condition should lack is recorded in `leaks` (and listed in the summary). Treat a leaked answer as out of the comparison.

## Rubric

Each item has anchored levels so the judge cannot give the top score by default.

| Item | Max | In total | Asks |
|---|---|---|---|
| precedentFit | 3 | yes | Did at least one precedent face the same decision or mechanism? |
| tradeoffs | 2 | yes | Does it say what a developer gave up or warned about, tied to this decision? |
| decisionImpact | 2 | yes | Does a precedent change or sharpen the recommendation? |
| sourcing | 2 | yes | Game, person and a source or record link per precedent? |
| separation | 2 | yes | Developer's words kept apart from the assistant's own reading? |
| honesty | 2 | yes | No invention; says plainly what is not on record? |
| actionability | 2 | yes | Concrete options or measurements, with what to decide? |
| goldRecall | 2 | no | Found the playbook's own cases? (Out of the total: it favours the skill conditions.) |
| gapHandling | 2 | no | Where nothing fits, does it split the decision or reason from a labelled principle? |

The judge also lists precedents that look `invented`. `total` is the in-total items scaled to 0–1.

## Running

Requirements: Node 18+, and the `claude` CLI logged in from a terminal (headless runs use the CLI's own login, not the desktop app's). For B and C, the GameGene connector must be connected on the same claude.ai account.

The playbook folder is the one holding `SKILL.md` and `references/`. If this kit sits at `eval/` in game-genre-playbooks, the default `../skills/roguelite` is found automatically; otherwise pass `--playbook` (or set `PLAYBOOK_DIR`).

```bash
node run.mjs --playbook=../skills/roguelite --run=r1 --reps=3 --concurrency=3
node judge.mjs --run=r1
node rank.mjs --run=r1
node summarize.mjs --run=r1
```

Options:

- `--questions=Q01,Q02` run only some questions (an id prefix is enough); `--conditions=A,B,A-trial` pick conditions (default `A,B,C,D`)
- `--lang=en` ask the English prompts (default `ja`)
- `--model=<name>` on any script picks the answering or judging model
- `--skill=<name>` install the playbook under another skill name (default: the `name:` in its `SKILL.md`)
- `--questions-file=<path>` use another questions file (for another genre); `--runs-dir=<path>` write runs elsewhere
- `--reuse=r1:A,B` copy those answers (and scores) from an earlier run, to rank a new variant against them without answering again; add `--rejudge` to copy only the answers
- `--keep-workspaces` keep the temp folders for inspection
- A run that stops part-way can be resumed with the same `--run`; finished answers are skipped. The run's playbook, questions file and language are stored in `runs/<runId>/meta.json` and reused by the other scripts

After regenerating a playbook, re-check each question's `goldCases` and `expectGap` against the new references and update `playbookCommit`.

## Cost and time

From our runs (10 questions × 4 conditions, default model):

- One answer: about **260k–570k tokens** (mostly cache reads; MCP conditions at the high end) and **60–100 s**. Those runs answered inside a full game repository, which loads its project instructions into every answer. From this kit's empty workspaces a 1-question smoke test used about 40k (D), 130k (A), 200k (B) and 300k (C) tokens and 40–60 s per answer, so expect less than the range above.
- A full pass of 12 questions × 4 conditions × 3 reps is 144 answers, plus 144 judge calls and 36 rank calls. At concurrency 3 that is roughly 1–1.5 hours of answering.

## Caveats

- **Same-family judge.** Answers and judgements come from Claude models. A judge may favour answers written the way it would write them. Use a different `--model` for the judge where you can, and read a sample of answers yourself before trusting a difference.
- **Small n.** 12 questions and a few reps. The same condition cites different precedents from run to run, so run at least 3 reps before claiming a difference between conditions, and look at per-question results, not only the mean.
- **Masking is partial.** Source names and gamegene.app links are masked before judging, but the style of a sourced answer still hints at its condition.
- **No project context.** Answers come from an empty folder, so the kit measures precedents and reasoning, not how well an answer uses a real game's facts. That is deliberate: it keeps the kit free of any one game's details.
- **goldRecall is playbook-centred.** An MCP answer that cites a fitting case from outside the playbook scores 0 there; that is why it is out of the total.

---

## 日本語

ジャンルのプレイブック（スキル）と GameGene MCP が、設計の相談への答えをどれだけ良くするかを、同じ問題・同じ採点で測るための仕組み。プレイブックを作り直したら回して、前回の結果と比べる。

### 中身

| ファイル | 役目 |
|---|---|
| `questions/roguelite.json` | ローグライト用プレイブックに向けた、ジャンル一般の設計の問い12問（日本語・英語）。問いごとに `goldQuestions`（当たるべきプレイブックの問い番号）、`goldCases`（その問いにプレイブックが持つ事例）、`expectGap`（プレイブックが「まだ記録に無い」とするもの）を持つ。最後の問いは当たる参照の無い対照問題 |
| `run.mjs` | 問い × 条件 × 回数を、ヘッドレスの `claude -p` で答えさせ、何を使ったか（スキル・MCP・プレイブックのファイル）を記録する |
| `judge.mjs` | `claude -p` を採点者にして採点する。採点者はツール・スキル・MCP なし。gold の問いの参照ファイルを渡し、「プレイブックにある」とされた事例を照合させる |
| `rank.mjs` | 同じ問いへの答えを、伏せて並べ替えたうえで横並びに順位づけし、どの答えにも無かったが欲しかった前例を挙げさせる |
| `summarize.mjs` | 条件ごと・問いごとの表を `runs/<runId>/summary.md` に書く |
| `lib.mjs` | 設定、条件、作業フォルダ、`claude -p` の起動、採点項目 |
| `variants/` | 比べたい `SKILL.md` の試作版（`variants/README.md`） |

### 条件

指示文ではなく起動オプションで切り替える（答える側は条件を知らない）。

| 条件 | プレイブック | GameGene MCP |
|---|---|---|
| A | あり | なし |
| B | あり | あり |
| C | なし | あり |
| D | なし | なし |
| A-`<版>`, B-`<版>` | `variants/<版>/` の試作版 `SKILL.md` | A / B と同じ |

切り分け方:

- どの条件も**専用の空の一時フォルダ**（`<tmp>/playbook-eval/<runId>/<条件>/`）から答える。スキルのある条件には `.claude/skills/<スキル名>/`（プレイブックのコピー、または `SKILL.md` を試作版にしたもの）だけを置き、C・D には何も置かない。プロジェクト内を検索してもプレイブックは見つからない
- どの条件でも、キットのフォルダ（gold のメモと過去の答えがある）と、プレイブックの元フォルダ（C・D が絶対パスで読めないように）の**読み取りを禁止**する
- C・D は、ユーザー単位やプラグインで入っている場合に備えて `skillOverrides` でもスキルを切る
- A・D は `disableClaudeAiConnectors` で GameGene を切る（GameGene は claude.ai のコネクタ）。B・C はツールを事前に許可する（ヘッドレスでは許可の確認に答えられない）。コネクタ名が違うときは `GAMEGENE_SERVERS`（カンマ区切り、既定 `mcp__claude_ai_GameGene,mcp__claude_ai_GameGeneStg`）を設定する
- どの条件でも Web 検索・Web 取得・編集・シェル・サブエージェントは使わせない
- 条件が持たないはずの情報源を使ったら `leaks` に記録する（要約にも出る）。その回は比較から外して考える

### 採点

各項目に段階の説明があり、採点者が満点を出しにくくしてある。項目は英語版の表のとおり（precedentFit 0〜3、tradeoffs / decisionImpact / sourcing / separation / honesty / actionability 各0〜2 が合計に入る。goldRecall と gapHandling は合計に入れずに報告だけする）。作り話に見える前例は `invented` に挙げさせる。`total` は合計に入る項目を0〜1に正規化したもの。

### 回し方

Node 18 以上と、ターミナルでログインした `claude` CLI が要る（ヘッドレス実行はデスクトップアプリとは別の認証を使う）。B・C には、同じ claude.ai アカウントで GameGene のコネクタがつながっていること。

プレイブックのフォルダは `SKILL.md` と `references/` があるところ。このキットを game-genre-playbooks の `eval/` に置けば既定の `../skills/roguelite` が自動で見つかる。それ以外は `--playbook`（または `PLAYBOOK_DIR`）で渡す。

```bash
node run.mjs --playbook=../skills/roguelite --run=r1 --reps=3 --concurrency=3
node judge.mjs --run=r1
node rank.mjs --run=r1
node summarize.mjs --run=r1
```

- 一部だけ: `--questions=Q01,Q02`（id の頭だけでよい）、`--conditions=A,B,A-trial`（既定 `A,B,C,D`）
- `--lang=en` で英語の問いを使う（既定 `ja`）
- `--model=<名前>` で答える側・採点側のモデルを変える
- `--skill=<名前>` で別のスキル名として入れる（既定は `SKILL.md` の `name:`）
- `--questions-file=<パス>` で別の問いのファイル（別ジャンル）、`--runs-dir=<パス>` で結果の置き場所を変える
- `--reuse=r1:A,B` で前の実行の答え（と採点）を写し、新しい試作版だけ答えさせて並べて比べる。`--rejudge` を付けると答えだけ写す
- `--keep-workspaces` で一時フォルダを残して中を見られる
- 途中で止まっても同じ `--run` で再実行すれば済んだ分は飛ばす。その実行のプレイブック・問いのファイル・言語は `runs/<runId>/meta.json` に残り、他のスクリプトもそれを使う

プレイブックを作り直したら、各問いの `goldCases` と `expectGap` を新しい参照ファイルと照らして直し、`playbookCommit` を更新する。

### 費用と時間

私たちの実行（10問 × 4条件、既定モデル）では:

- 答え1回: 約 **26万〜57万トークン**（大半はキャッシュ読み。MCP ありの条件が多い側）、**60〜100秒**。これはゲームの repo の中で答えさせた数字で、毎回プロジェクトの指示が読み込まれていた。このキットの空フォルダで1問だけ試したときは、答え1回あたり約4万（D）・13万（A）・20万（B）・30万（C）トークン、40〜60秒だったので、上の幅より少なめになるはず
- 12問 × 4条件 × 3回 = 144回答 + 採点144回 + 順位づけ36回。並列3で答えだけでおよそ1〜1.5時間

### 注意

- **採点者が同じ系統のモデル。** 答えも採点も Claude。自分の書き方に近い答えをひいきするおそれがある。できれば採点に別の `--model` を使い、差を信じる前に答えをいくつか自分で読むこと
- **件数が少ない。** 12問と数回。同じ条件でも回ごとに挙げる前例が変わるので、条件の差を言うなら3回以上回し、平均だけでなく問いごとの結果も見ること
- **伏せ字は完全ではない。** 採点前に情報源の名前と gamegene.app のリンクは伏せるが、出典付きの書きぶりから条件はある程度わかる
- **プロジェクトの文脈なし。** 空のフォルダから答えるので、実在のゲームの事実をどう使うかではなく、前例と推論を測る。特定のゲームの情報を持ち込まないための意図的な選択
- **goldRecall はプレイブック中心。** MCP がプレイブック外の当たる事例を挙げても0点になるので、合計からは外してある
