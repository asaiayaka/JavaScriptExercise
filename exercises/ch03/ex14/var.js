/* eslint-disable */
for (var i = 0; i < 10; i++) {
    (function () {
      var i = 100;
    })();
    console.log(i);
  }
  console.log(i);
  
  // varは関数スコープ。for文で定義したiは全スコープで共有される。
  // function()内のvar i = 100は、完全に別スコープのi
  // L9のコンソールはfor文で使っているiを参照しており、ループ回数ごとに0~9を表示
  // 最後のコンソールは、ループが終わった後のi(つまり10)を表示する。