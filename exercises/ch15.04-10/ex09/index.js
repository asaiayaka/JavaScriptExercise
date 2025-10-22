document.getElementById("image").addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const img = new Image();
  const reader = new FileReader();

  reader.addEventListener("load", (e) => {
    img.src = e.target.result;
  });

  img.addEventListener("load", () => {
    const originalCanvas = document.getElementById("original");
    const filteredCanvas = document.getElementById("filtered");
    const originalCtx = originalCanvas.getContext("2d");
    const filteredCtx = filteredCanvas.getContext("2d");

    originalCanvas.width = img.width;
    originalCanvas.height = img.height;
    filteredCanvas.width = img.width;
    filteredCanvas.height = img.height;

    originalCtx.drawImage(img, 0, 0);

    const imageData = originalCtx.getImageData(0, 0, img.width, img.height);
    const data = imageData.data;

    const width = img.width;
    const height = img.height;

    // 5x5 ガウシアンカーネル (σ ≈ 1)
    const kernel = [
      [1,  4,  7,  4, 1],
      [4, 16, 26, 16, 4],
      [7, 26, 41, 26, 7],
      [4, 16, 26, 16, 4],
      [1,  4,  7,  4, 1]
    ].map(row => row.map(v => v / 273));

    const outputData = new Uint8ClampedArray(data.length);

    // ピクセル単位で畳み込み
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        let r = 0, g = 0, b = 0;

        for (let ky = 0; ky < 5; ky++) {
          for (let kx = 0; kx < 5; kx++) {
            const px = x + kx - 2; // カーネル中心が 2
            const py = y + ky - 2;

            if (px >= 0 && px < width && py >= 0 && py < height) {
              const idx = (py * width + px) * 4;
              const k = kernel[ky][kx];
              r += data[idx] * k;
              g += data[idx + 1] * k;
              b += data[idx + 2] * k;
            }
          }
        }

        const i = (y * width + x) * 4;
        outputData[i] = r;
        outputData[i + 1] = g;
        outputData[i + 2] = b;
        outputData[i + 3] = data[i + 3]; // アルファはそのまま
      }
    }

    const outputImageData = new ImageData(outputData, width, height);
    filteredCtx.putImageData(outputImageData, 0, 0);
  });

  reader.readAsDataURL(file);
});
