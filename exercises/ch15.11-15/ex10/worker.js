// Web Worker: 受け取った ArrayBuffer を Uint8ClampedArray にして
// 5x5 ガウシアンで畳み込みをして ArrayBuffer を返す

self.addEventListener('message', (ev) => {
  const msg = ev.data;
  if (msg?.type !== 'process') return;

  try {
    const width = msg.width;
    const height = msg.height;
    const buffer = msg.buffer; // ArrayBuffer（トランスファーされている）

    // 受け取ったバッファをラップ
    const src = new Uint8ClampedArray(buffer);

    // 出力用バッファを作成（バイト長は同じ）
    const outBuffer = new ArrayBuffer(src.length);
    const out = new Uint8ClampedArray(outBuffer);

    // 5x5 ガウシアンカーネル（合計273）
    const kernel = [
      [1,  4,  7,  4, 1],
      [4, 16, 26, 16, 4],
      [7, 26, 41, 26, 7],
      [4, 16, 26, 16, 4],
      [1,  4,  7,  4, 1]
    ].map(row => row.map(v => v / 273));

    // 畳み込み（ネイティブループ）
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        let r = 0, g = 0, b = 0;
        for (let ky = 0; ky < 5; ky++) {
          for (let kx = 0; kx < 5; kx++) {
            const px = x + kx - 2;
            const py = y + ky - 2;
            if (px >= 0 && px < width && py >= 0 && py < height) {
              const idx = (py * width + px) * 4;
              const k = kernel[ky][kx];
              r += src[idx] * k;
              g += src[idx + 1] * k;
              b += src[idx + 2] * k;
            }
          }
        }
        const i = (y * width + x) * 4;
        out[i]     = Math.round(r);
        out[i + 1] = Math.round(g);
        out[i + 2] = Math.round(b);
        out[i + 3] = src[i + 3]; // アルファをそのままコピー
      }
    }

    // 結果をメインスレッドへ転送（ArrayBuffer をトランスファー）
    self.postMessage({ type: "result", width, height, buffer: outBuffer }, [outBuffer]);
  } catch (err) {
    self.postMessage({ type: "error", message: String(err) });
  }
});
