# 解答

## 理由

JavaScript初期の仕様ではundefinedは予約語ではなく、グローバル変数だったため、誰かがこう書いてしまうことができた：

undefined = "not undefined";

すると、次のようなチェックが意図した動作をしなくなる恐れがあった：

if (foo === undefined) {
    // これが正しく動かない可能性がある
}

解決策として登場したのがvoid 0で、void演算子は「どんな値でもundefinedに変換する」ため、void 0（= 0 の void）は常に undefinedを返す上に、誰にも上書きできない安全な方法だった。

## 今ではこのような描き方をしない理由

ECMAScript5（2009年）以降、仕様が変更されundefinedは読み取り専用で上書き不可になった。

undefined = "new value"; // 効果なし、エラーになるか無視される
