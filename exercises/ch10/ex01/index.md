# 結果

## none

P276のコード構造と非常に近く、即時関数と exports によるモジュール定義がそのまま保持されている

## development

Webpack内部処理が追加されるが、P276の構造に似た形を維持しており、デバッグ向き

## production

圧縮により構造が変わり、可読性が失われており、P276の手動コードとの直接比較は困難

## 実行結果

(base) PS C:\Users\r23600307\Desktop\exercises-public\exercises> npx webpack --mode=none
asset main.js 10.1 KiB [emitted] (name: main)
./ch10/ex01/index.cjs 328 bytes [built] [code generated]
./ch10/ex01/stats.cjs 728 bytes [built] [code generated]
./ch10/ex01/sets.cjs 7.73 KiB [built] [code generated]
webpack 5.100.2 compiled successfully in 90 ms
(base) PS C:\Users\r23600307\Desktop\exercises-public\exercises> npx webpack --mode=development
asset main.js 12 KiB [emitted] (name: main)
./ch10/ex01/index.cjs 328 bytes [built] [code generated]
./ch10/ex01/stats.cjs 728 bytes [built] [code generated]
./ch10/ex01/sets.cjs 7.73 KiB [built] [code generated]
webpack 5.100.2 compiled successfully in 73 ms
(base) PS C:\Users\r23600307\Desktop\exercises-public\exercises> npx webpack --mode=production
asset main.js 1.91 KiB [emitted] [minimized] (name: main)
./ch10/ex01/index.cjs 328 bytes [built] [code generated]
./ch10/ex01/stats.cjs 728 bytes [built] [code generated]
./ch10/ex01/sets.cjs 7.73 KiB [built] [code generated]
webpack 5.100.2 compiled successfully in 216 ms

## 解答根拠

① --mode=none
Webpack でも、同じように即時関数 (IIFE) + exports 形式でモジュールを閉じ込める構造になる。
可読性も保たれているため、P276の構造と非常に似ている。
ファイルサイズが 10.1 KiB → 小さすぎず、大きすぎず。
「minimized」などの記述がない → 圧縮処理はされていない。

→ 「Webpackでも同じような構造の自動生成ができる」ことが確認できる。(dist/main.jsを見る)

② --mode=development
サイズが増えている（12 KiB） → デバッグ情報（たとえばソースマップや関数ラップ）を含むため。
minimized 表記なし → 圧縮されていない。
Webpackはこのモードで devtool などを有効にし、開発者向けに使いやすく調整してくれる。
即時関数＋exports形式はそのまま残りつつ、内部に Webpack 独自の__webpack_require__ や module cache などが追加される。

P276より少し複雑だが、元の構造や関数名は保持されているので比較しやすい。

③ --mode=production
サイズが 1.91 KiB に大幅減少。
[minimized] と表示 → 圧縮され、可読性が著しく下がっている。
即時関数構造なども変形・短縮されていて、P276のコードとは一見して別物に見える。

→ 比較することで、「構造が変わらない none/dev」と「大きく変わる production」の違いが理解できる。
