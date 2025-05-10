# 結果

## 1つ目のブロック

### strictモードの際のconsoleの結果

> node exercises/ch05/ex10/index1.js
file:///C:/Users/r23600307/Desktop/exercises-public/exercises/ch05/ex10/index1.js:4
with (obj) {
^^^^

SyntaxError: Strict mode code may not include a with statement
    at ModuleLoader.moduleStrategy (node:internal/modules/esm/translators:168:18)
    at callTranslator (node:internal/modules/esm/loader:279:14)
    at ModuleLoader.moduleProvider (node:internal/modules/esm/loader:285:30)
    at async link (node:internal/modules/esm/module_job:78:21)

Node.js v20.12.1

とエラーが出た。原因は、strictモードだったため。

### 非strictモードの実行結果

> node exercises/ch05/ex10/index1.cjs
{ a: 1, b: 2, obj: { a: 4, b: 4 } }

理由は、
a → withの外側の変数 → 変更されていない（1）
b → withの外側の変数 → 変更されていない（2）
obj.a → obj.b の値（4）に更新された
obj.b → そのまま4

### withを使わないコードの実行結果

> node exercises/ch05/ex10/index1_2.js
{ a: 1, b: 2, obj: { a: 4, b: 4 } }

## 2つ目のブロック

### strictモードの際のconsoleの結果

同じエラーのため割愛。

### 非strictモードの実行結果

> node exercises/ch05/ex10/index2.cjs
{ a: 4, b: 2, obj: { b: 4 } }

理由は、
a → 1 → 4に更新される
→→ obj.a は 存在しない
だから → 外側の a を使って代入する（a = ...）

b → そのまま 2（変更なし）
→→ obj.b は 存在する（値は 4）
だから → b は obj.b と解釈される（... = obj.b）

obj.b → 4 のまま

obj.a → 追加されていない

### withを使わないコードの実行結果

> node exercises/ch05/ex10/index2_2.js
{ a: 4, b: 2, obj: { b: 4 } }

## 3つ目のブロック

### strictモードの際のconsoleの結果

同じエラーのため割愛。

### 非strictモードの実行結果

> node exercises/ch05/ex10/index3.cjs
{ a: 1, b: 2, obj: { a: 2 } }

理由は、
a → withの外側の変数 → 変更されていない（1）
b → withの外側の変数 → 変更されていない（2）
obj.a → obj.b の値（2）に更新された

### withを使わないコードの実行結果

> node exercises/ch05/ex10/index3_2.js
{ a: 1, b: 2, obj: { a: 2 } }

## 4つ目のブロック

### strictモードの際のconsoleの結果

同じエラーのため割愛。

### 非strictモードの実行結果

> node exercises/ch05/ex10/index4.cjs
{ a: 2, b: 2, obj: {} }

理由は、
obj の中には a も b も存在していないため、with 文の中の a = b を解釈すると：

a を探す：
obj.a → 存在しない → 外側の a が使われる

b を探す：
obj.b → 存在しない → 外側の b が使われる

そのため、aはbによって置き換えられた。

また、objの中身は空なので、そのまま出力された。

### withを使わないコードの実行結果

> node exercises/ch05/ex10/index4_2.js
{ a: 2, b: 2, obj: {} }
