import fs from "fs";

export function checkEntry(path) {
    try {
        // fs.statSyncは、パスの情報(Statオブジェクト)を取得する
        const stats = fs.statSync(path);

        // 通常ファイルか？
        if (stats.isFile()) {
            return "file";
        }

        // ディレクトリか？
        if (stats.isDirectory()) {
            return "directory";
        }

        // それ以外(例：シンボリックリンク、ソケット、デバイスファイルなど)
        return "order";
    } catch (err) {
        // ファイルやディレクトリが存在しない場合の代表的なエラー
        if (err.code === "ENOENT") {
            return "not-found";
        }

        // 権限がなくて読めないなど、その他のエラー
        throw "error";
    }
}

// 動作確認用
const targets = [
    "checkEntry.mjs", // 自分自身 → file
    ".", // カレントディレクトリ → directory
    "not-exist", // 存在しない → not-found
];

for (const t of targets) {
    console.log(t, "=>", checkEntry(t));
}