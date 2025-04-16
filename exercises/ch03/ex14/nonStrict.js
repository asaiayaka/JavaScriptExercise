for (i = 0; i < 10; i++) {
    (function () {
      i = 100;
    })();
    console.log(i);
  }
  console.log(i);


  // 非モジュール状態：
// package.json の "type" を消す or "type": "commonjs" にする

// json
// コピーする
// 編集する
// {
//   "type": "commonjs"
// }

// 実行結果
// 100
// 101

// 1.初期状態：
// iは未定義→非strictモードなのでグローバル変数として初期化される
// 2.i=0 → i < 10 (true) → ループに入る
// 3.ループ1週目：
// (function () {i = 100;})(); → i = 100
// console.log(i) → 100
// i++ → 101
// 4.次のループ条件チェック：
// i < 10 → 101 < 10 → false