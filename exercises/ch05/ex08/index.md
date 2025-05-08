# 結果

## 結果予想

errorが返却される

## 実行結果

> node ch05/ex08/index.js
5

## 調査結果

ECMAScript仕様によると：
continue 文は finally ブロック内では break や return を無視してしまうため、仕様として禁止されています。

このため、JavaScriptエンジンは SyntaxError（構文エラー） を投げます。

たとえば、以下のコードを Chrome や Node.js で実行すると：
try {
  break;
} finally {
  continue;
}
このようなエラーになります：
SyntaxError: 'continue' is not allowed in a 'finally' block
