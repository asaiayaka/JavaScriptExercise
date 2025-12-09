// メインスレッド側：DOM操作、Workerの起動、アニメーション管理など

document.addEventListener("DOMContentLoaded", init);

console.log("index.js loaded");

function init() {
  // DOM要素参照
  const fileInput = document.getElementById("image");
  const startWorkBtn = document.getElementById("startWork");
  const startWorkMainBtn = document.getElementById("startWorkMain");
  const originalCanvas = document.getElementById("original");
  const filteredCanvas = document.getElementById("filtered");
  const animCanvas = document.getElementById("anim");

  const originalCtx = originalCanvas.getContext("2d");
  const filteredCtx = filteredCanvas.getContext("2d");
  const animCtx = animCanvas.getContext("2d");

  // 状態変数
  let imgWidth = 0;
  let imgHeight = 0;
  let currentImageData = null; // 元画像の ImageData

  // Worker を生成（module worker）
  const worker = new Worker(new URL("./worker.js", import.meta.url), {
    type: "module",
  });

  // Worker からのメッセージ受信
  worker.addEventListener("message", (ev) => {
    const msg = ev.data;
    if (msg.type === "result") {
      // ArrayBuffer を受け取り Uint8ClampedArray に戻して描画
      const width = msg.width;
      const height = msg.height;
      const outArr = new Uint8ClampedArray(msg.buffer);
      const outputImageData = new ImageData(outArr, width, height);
      filteredCanvas.width = width;
      filteredCanvas.height = height;
      filteredCtx.putImageData(outputImageData, 0, 0);
      console.log("Worker: フィルタ処理完了");
    } else if (msg.type === "error") {
      console.error("Worker error:", msg.message);
      alert("Worker error: " + msg.message);
    }
  });

  // 画像読み込み処理
  fileInput.addEventListener("change", (event) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    const img = new Image();
    const reader = new FileReader();

    // 読み込まれたら Image の src にセット
    reader.addEventListener("load", (e) => {
      img.src = e.target.result;
    });

    // Image の読み込み完了後にキャンバスへ描画して ImageData を取得
    img.addEventListener("load", () => {
      imgWidth = img.width;
      imgHeight = img.height;

      // キャンバスのサイズを画像に合わせる
      originalCanvas.width = imgWidth;
      originalCanvas.height = imgHeight;
      filteredCanvas.width = imgWidth;
      filteredCanvas.height = imgHeight;

      // 元画像を描画して ImageData を保持
      originalCtx.drawImage(img, 0, 0);
      currentImageData = originalCtx.getImageData(0, 0, imgWidth, imgHeight);

      // フィルタ結果キャンバスはクリア
      filteredCtx.clearRect(0, 0, filteredCanvas.width, filteredCanvas.height);
    });

    reader.readAsDataURL(file);
  });

  // Worker に処理を投げるボタン
  startWorkBtn.addEventListener("click", () => {
    if (!currentImageData) {
      alert("画像を選んでください");
      return;
    }

    // 元バッファを直接渡すとメイン側のデータが neutered になるので
    // コピーしてから転送する（UI側のデータを残すため）
    const copy = currentImageData.data.buffer.slice(0); // ArrayBuffer のコピー
    worker.postMessage(
      { type: "process", width: imgWidth, height: imgHeight, buffer: copy },
      [copy]
    );
    console.log("Worker にデータ送信（トランスファー）: 処理中...");
  });

  // メインスレッドで同じ重い処理を実行（比較用）
  startWorkMainBtn.addEventListener("click", () => {
    if (!currentImageData) {
      alert("画像を選んでください");
      return;
    }

    // 現在の ImageData のコピーを作成してメインスレッドで処理
    const srcCopy = new Uint8ClampedArray(currentImageData.data); // データを複製
    const width = imgWidth;
    const height = imgHeight;

    console.log("メインスレッド処理開始（UIブロックが確認できます）");
    const result = applyGaussianMainThread(srcCopy, width, height);
    const outImageData = new ImageData(result, width, height);
    filteredCanvas.width = width;
    filteredCanvas.height = height;
    filteredCtx.putImageData(outImageData, 0, 0);
    console.log("メインスレッド処理完了");
  });

  // メインスレッド用：ガウシアン畳み込み（比較）
  function applyGaussianMainThread(srcData, width, height) {
    // 5x5 ガウシアンカーネル（合計 273）
    const kernel = [
      [1, 4, 7, 4, 1],
      [4, 16, 26, 16, 4],
      [7, 26, 41, 26, 7],
      [4, 16, 26, 16, 4],
      [1, 4, 7, 4, 1],
    ].map((row) => row.map((v) => v / 273));

    const out = new Uint8ClampedArray(srcData.length);

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        let r = 0,
          g = 0,
          b = 0;
        for (let ky = 0; ky < 5; ky++) {
          for (let kx = 0; kx < 5; kx++) {
            const px = x + kx - 2;
            const py = y + ky - 2;
            if (px >= 0 && px < width && py >= 0 && py < height) {
              const idx = (py * width + px) * 4;
              const k = kernel[ky][kx];
              r += srcData[idx] * k;
              g += srcData[idx + 1] * k;
              b += srcData[idx + 2] * k;
            }
          }
        }
        const i = (y * width + x) * 4;
        out[i] = Math.round(r);
        out[i + 1] = Math.round(g);
        out[i + 2] = Math.round(b);
        out[i + 3] = srcData[i + 3]; // アルファはそのまま
      }
    }

    return out;
  }

  // アニメーション（ボール）: メインスレッドで常時動作
  let ball = { x: 20, y: 20, vx: 2.2, vy: 1.6, r: 10 };

  function animate() {
    animCtx.clearRect(0, 0, animCanvas.width, animCanvas.height);

    // 壁反射
    if (ball.x - ball.r < 0 && ball.vx < 0) ball.vx = -ball.vx;
    if (ball.x + ball.r > animCanvas.width && ball.vx > 0) ball.vx = -ball.vx;
    if (ball.y - ball.r < 0 && ball.vy < 0) ball.vy = -ball.vy;
    if (ball.y + ball.r > animCanvas.height && ball.vy > 0) ball.vy = -ball.vy;

    ball.x += ball.vx;
    ball.y += ball.vy;

    // ボール描画
    animCtx.beginPath();
    animCtx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2);
    animCtx.fillStyle = "#ff6666";
    animCtx.fill();
    animCtx.strokeStyle = "#b33";
    animCtx.stroke();

    animCtx.fillStyle = "#000";
    animCtx.font = "10px sans-serif";
    animCtx.fillText("animation running", 6, animCanvas.height - 8);

    requestAnimationFrame(animate);
  }
  requestAnimationFrame(animate);
}
