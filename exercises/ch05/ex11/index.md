# 調査

## 準備：サンプルコード（index.cjs）

let a = 1;
let b = 2;

debugger;  // 実行がここで一時停止

let c = a + b;
console.log(c);

## 実行手順（Node.js でデバッガを起動）

### 方法1：Chrome DevTools を使う

node inspect-brk index.cjs

するとターミナルにこう出ます：

Debugger listening on ws://127.0.0.1:9229/xxxxxxxxxxxx
For help, see: https://nodejs.org/en/docs/inspector

1.表示されたURLをブラウザ（Chrome）で開く
Chromeの 開発者ツール → Node タブ が開きます。

2.ステップ実行・変数確認がGUIでできる

### 方法2：ターミナル内での対話モード（簡易版）

node inspect index.cjs
そのままステップ実行が可能になります：

cont：続行

next：次の行へ

repl：変数の中身を手動で確認（a などを入力）

#### debugger の意味

debugger; が書かれている場所で実行が一時停止します。

デバッガが有効でなければ、debugger は何も起こしません（無視されるだけ）。
