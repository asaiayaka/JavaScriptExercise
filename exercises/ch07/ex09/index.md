# 解答

## 調査

"𠮷野家"[0] // 結果は"�"

理由としては、"𠮷"(U+20BB7)はサロゲートペア(2つのコードユニット)で表現される文字。
JavaScriptの文字列はUTF-16ベースで、1文字=1コードユニットとして扱うため、"𠮷".length === 2
となる。
str[0]は最初のコードユニットしか返さないので、正しい文字にならない�というreplacement characterが表示される。

 "👨‍👨‍👧‍👧"[0] // 結果: "�"

理由としては、この絵文字は複数の絵文字＋ゼロ幅接合子(ZWJ:\u200D)を組み合わせた複合書記素クラスタ。
内部的には11個のコードユニットを取り出すだけなので、部分的で壊れた文字になり、�となります。

## 問題7.8で得た絵文字に対する知見

👨‍👨‍👧‍👧は見た目「1文字」でも、実際は複数の絵文字＋ZWJ
Intl.Segmenter や grapheme-splitter のようなUnicode-awareライブラリ・APIでなければ正しく処理できない。
split("")や[0]ではクラスタを壊してしまう。
