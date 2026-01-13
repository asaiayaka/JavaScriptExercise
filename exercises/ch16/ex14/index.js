// 別スレッドでWorkerが実行される
const worker = new Worker("./worker.js", {type: "module"});

document.getElementById("image").addEventListener("change", (event) => {
    // ファイル選択時に呼ばれる
    const file = event.target.files[0];
    if (!file) {
        return;
    }

    const img = new Image(); // 読み込んだ画像を表示するためのImageオブジェクト
    const reader = new FileReader(); // ローカルファイルを読み込むためのAPI

    // ファイルの読み込みが完了したらdataURLをimgに設定する
    reader.addEventListener("load", (e) => {
        img.src = e.target.result;
    });

    // 画像が完全に読み込まれたらCanvasに描画する
    img.addEventListener("load" , () => {
        const originalCanvas = document.getElementById("original");
        const filteredCanvas = document.getElementById("filtered");
        const originalCtx = originalCanvas.getContext("2d");
        const filteredCtx = filteredCanvas.getContext("2d");

        // 画像サイズに合わせてCanvasの大きさを変更
        originalCanvas.width = img.width;
        originalCanvas.height = img.height;
        filteredCanvas.width = img.width;
        filteredCanvas.height = img.height;

        // 元の画像をCanvasに描画
        originalCtx.drawImage(img, 0, 0);

        // Canvas上の全ピクセルデータ(RGBA配列)を取得
        // dataはUint8ClampedArrayで、[R,G,B,A,R,G,B,A,...]の並び
        const imageData = originalCtx.getImageData(0, 0, img.width, img.height);

        // ここからWorkerに処理を依頼する
        // 生のピクセル配列と画像サイズを送信する
        worker.postMessage({
            data: imageData.data,
            width: img.width,
            height: img.height,
        });
    });

    // 実際にファイル読み込みを開始(Base64形式で読み込む)
    reader.readAsDataURL(file);
});

// Worker側の処理が終わるとmessageイベントが届く
worker.addEventListener("message", (event) => {
    const {outputData, width, height} = event.data;

    const filteredCanvas = document.getElementById("filtered");
    const filteredCtx = filteredCanvas.getContext("2d");

    // Workerから帰ってきた画素配列をImageDataに戻す
    const outputImageData = new ImageData(outputData, width, height);

    // フィルタ適用後の画像をCanvasに描画
    filteredCtx.putImageData(outputImageData, 0, 0);
})