// statsモジュールを定義する。
const stats = (function () {
  // モジュールに閉じたユーティリティ関数。
  const sum = (x, y) => x + y;
  const square = (x) => x * x;
  // エクスポートする公開関数。
  function mean(data) {
    return data.reduce(sum) / data.length;
  }
  // エクスポートする公開関数。
  function stddev(data) {
    let m = mean(data);
    return Math.sqrt(
      data
        .map((x) => x - m)
        .map(square)
        .reduce(sum) /
        (data.length - 1)
    );
  }
  // オブジェクトのプロパティとして公開関数をエクスポートする。
  return { mean, stddev };
})();

module.exports.stats = stats;