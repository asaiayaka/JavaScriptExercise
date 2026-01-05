import { spawn } from "child_process";
import path from "path";

// ESMでこのファイルの絶対パスとして__dirnameを定義するイディオム
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// startChildで起動したプロセスの参照
let child = null;

// node ./child.js を起動し、このプロセスが終了したときに解決するPromiseを返す
// cf. https://nodejs.org/api/child_process.html#event-close
async function startChild() {
  const childPath = path.join(__dirname, "child.js");
  child = spawn("node", [childPath]);

  child.stdout.on("data", (data) => {
    console.log(`stdout: ${data}`);
  });

  child.stderr.on("data", (data) => {
    console.error(`stderr: ${data}`);
  });

  return new Promise((res) => {
    child.on("close", (code, signal) => {
      res([code, signal]);
    });
  });
}

// TODO: ここに処理を書く
// 親プロセスが終了処理中かどうかのフラグ
let shuttingDown = false;

// 子プロセスを監視し、異常終了時には再起動するループ
(async function supervise() {
  while (true) {
    // 子プロセスを起動
    const [code, signal] = await startChild();

    // 親プロセスがシャットダウン中なら起動しない
    if (shuttingDown) {
      console.log("Parent is shutting down. Not restarting child.");
      break;
    }

    // シグナルによる終了の場合
    if (signal) {
      console.log(`Children exited due to signal ${signal}. Not restarting.`);
      break;
    }

    // 異常終了（exit code !== 0）の場合は再起動
    console.log(`Child exited with code ${code}. Restarting...`);
  }
})();

// トラップするシグナルの定義
const signals = ["SIGINT", "SIGTERM"]; // 2種類以上トラップ

signals.forEach((sig) => {
  process.on(sig, async () => {
    console.log(`Parent received ${sig}`);
    shuttingDown = true;

    // 子プロセスが存在し、まだ生きている場合
    if (child && !child.killed) {
      console.log(`Forwarding ${sig} to child...`);

      // 親が受け取ったのと同じシグナルを子に送信
      child.kill(sig);

      // 子プロセスがそのシグナルで終了するのを待つ
      await new Promise ((res) => {
        child.once("close", (code, signal) => {
          console.log(`Child exited. code=${code}, signal=${signal}`);
          res();
        });
      });
    }

    console.log("Parent exiting.");
    process.exit(0);
  });
});