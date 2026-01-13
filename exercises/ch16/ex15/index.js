import { Worker, isMainThread, parentPort } from "worker_threads";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);

if (isMainThread) {
    // メインスレッド
    // 共有メモリは使わず、通常のnumber型の変数としてカウンタを持つ
    let num = 0;

    // 同じファイルをWorkerとして起動
    const worker = new Worker(__filename, { type: "module" });

    // Workerから届くメッセージを処理する
    worker.on("message", (msg) => {
        if (msg === "inc") {
            // Workerから「インクリメントしてほしい」という要求を受信したら
            num++;
        } else if (msg === "done") {
            // Worker側の処理がすべて終わった通知を受け取ったら最終的な値を表示する
            console.log(num);
        }
    });

    // Workerが起動したら、メインスレッド側の処理を開始
    worker.on("online", () => {
        // メインスレッド自身でもカウンタを増やす
        for (let i = 0; i < 10_000_000; i++) {
            num++;
        }
    });
} else {
    // Workerスレッド
    // Worker側ではnumという変数を直接触ることができない
    // 代わりに「インクリメントしてほしい」というメッセージを送る
    for (let i = 0; i < 10_000_000; i++) {
        // メインスレッドに対してインクリメント要求を送信
        parentPort.postMessage("inc");
    }

    // すべての要求を送り終えたら完了通知を送る
    parentPort.postMessage("done");
}
