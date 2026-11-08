# Trial SKILL.md variants

A variant replaces only the playbook's `SKILL.md`; its `references/` are the playbook's own. To try a change, copy the current `skills/game-design-playbook/SKILL.md` to `variants/<name>/SKILL.md`, edit it, and use it by adding `-<name>` to a skill condition: `A-<name>` (variant, no MCP) or `B-<name>` (variant + MCP). `run.mjs` copies the playbook into the condition's workspace, swaps in the variant `SKILL.md` and rewrites its `name:` to the playbook's skill name.

Compare a variant with the playbook's own on the same questions, e.g. `--conditions=A,A-<name>,B,B-<name>`.

## Variants tried so far

No variant files are kept here: what worked went into the playbook itself.

| Variant | Based on | What changed | Result |
|---|---|---|---|
| v2 | playbook `0f9fb5a` | A fixed shape for each precedent (game — person — what they chose and gave up — source; developer's words vs reading; what this precedent decides). GameGene used only to fill gaps and to look outside the genre, with entry points per question | Skill only 0.88 → 0.92, skill + MCP 0.84 → 0.94; adopted in `1b7ab86` (#3), with closeness labels added for the honesty dip |
| v3a | v2 | "How to use" step 4: split an uncovered decision into parts that do have cases; reason from a joseki where nothing fits, labelled as reasoning | No measurable difference on four gap questions; v2 already did both (#3) |

---

# SKILL.md の試作版（日本語）

試作版は `SKILL.md` だけを差し替え、`references/` はプレイブックのものをそのまま使う。試すときは、今の `skills/game-design-playbook/SKILL.md` を `variants/<名前>/SKILL.md` にコピーして書き換え、スキルのある条件に `-<名前>` を付けて使う（`A-<名前>` = 試作版・MCP なし、`B-<名前>` = 試作版 + MCP）。`run.mjs` は条件ごとの作業フォルダにプレイブックをコピーし、`SKILL.md` を試作版に差し替えて `name:` をプレイブックのスキル名に書き換える。

同じ問いで元の版と比べる（例: `--conditions=A,A-<名前>,B,B-<名前>`）。

## これまでに試した版

効いたものはプレイブック本体に入ったので、試作版のファイルはここに残していない。

| 版 | 元 | 変えたこと | 結果 |
|---|---|---|---|
| v2 | プレイブック `0f9fb5a` | 前例ごとの書き方を固定（作品 — 人物 — 選んだこと・捨てたもの — 出典、発言か読みか、この前例で何が決まるか）。GameGene は穴埋めとジャンル外探しだけに使い、問いごとの入口を表に足す | スキルのみ 0.88 → 0.92、スキル＋MCP 0.84 → 0.94。`1b7ab86` で取り込み（#3）。正直さの下落には前例の近さの表示を足した |
| v3a | v2 | 「使い方」4番: 前例が当たらない判断は前例のある部分に分け、それでも当たらない部分は定石からの推論と明示する | 記録の穴がある4問で差なし。v2 の時点で両方できていた（#3） |
