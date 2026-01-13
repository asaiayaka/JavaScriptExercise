// 計算専用スレッド
self.addEventListener("message", (event) => {
  // メインスレッドから送られてきたデータを受け取る
  const { data, width, height } = event.data;

  // ガウシアンフィルターのカーネル(5×5)
  // 合計が1になるように正規化している(明るさを変えないため)
  const kernel = [
    [1, 4, 7, 4, 1],
    [4, 16, 26, 16, 4],
    [7, 26, 41, 26, 7],
    [4, 16, 26, 16, 4],
    [1, 4, 7, 4, 1],
  ].map((row) => row.map((v) => v / 273));

  //   出力用のピクセル配列を作成(元画像と同じサイズ)
  const outputData = new Uint8ClampedArray(data.length);

  //   各プロセスに対して畳み込み演算を行う
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let r = 0,
        g = 0,
        b = 0;

      // カーネル(5×5)の範囲を走査
      for (let ky = 0; ky < 5; ky++) {
        for (let kx = 0; kx < 5; kx++) {
          // 現在の画素に対する元画像上の座標
          const px = x + kx - 2; // 中心が(2, 2)なので-2
          const py = y + ky - 2;

          // 画像の外にはみ出した場合は無視する(端の処理)
          if (px >= 0 && px < width && py >= 0 && py < height) {
            const idx = (py * width + px) * 4; // RGBAの先頭インデックス
            const k = kernel[ky][kx]; // カーネルの重み

            // RGBAそれぞれに重み付き加算
            r += data[idx] * k;
            g += data[idx + 1] * k;
            b += data[idx + 2] * k;
          }
        }
      }

      // 出力画像の該当ピクセルに結果を書き込む
      const i = (y * width + x) * 4;
      outputData[i] = r;
      outputData[i + 1] = g;
      outputData[i + 2] = b;
      outputData[i + 3] = data[i + 3]; // 透明度(α値)は元のまま
    }
  }

  //   計算結果をメインスレッドに返す
  self.postMessage({
    outputData,
    width,
    height,
  });
});
