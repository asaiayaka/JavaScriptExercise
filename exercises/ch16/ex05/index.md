# 解答

## 標準入力

プログラムが外部から入力を受け取るための入り口で、通常はキーボード。
Node.jsではprocess.stdin

例(FODが標準入力として渡される)：

```bash
echo FOO | node cat.mjs
```

## 標準出力

プログラムが通常の結果を出力する先のことで、通常はコンソールのこと。
Node.jsではprocess.stdout

例：

```js
console.log("Hello");
```

## 標準エラー出力

エラーメッセージ専用の出力先で、通常はコンソールだが、stdoutとは別。
Node.jsではprocess.stderr

例：

```js
console.error("エラーです");
```

## リダイレクト

標準入力・出力の向き先を変更する仕組みで、シェルの機能

| 記号 | 意味 |
| --- | --- |
| > | 標準出力をファイルへ |
| < | ファイルを標準入力へ |
| 2> | 標準エラー出力をファイルへ |

例：

```bash
node cat.mjs > output.txt
```

## パイプ

あるコマンドの標準出力を、別のコマンドの標準入力につなぐ。記号は|

例：

```bash
echo FOO | node cat.mjs
```
