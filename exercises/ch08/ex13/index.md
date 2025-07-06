# 解答

new Function(...)にユーザー入力inputをそのまま組み込んでいるため、利用者が悪意を持ってJavaScriptコードを入力すると、webサービス上で任意コードが実行されてしまう
= リモートコード実行(RCE: Remote Code Execution)の脆弱性。

## 出力

Hello, "World"
Hello, "\"; process.exit();"
