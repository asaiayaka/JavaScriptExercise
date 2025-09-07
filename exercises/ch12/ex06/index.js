import fs from "fs";
import path from "path";

// ディレクトリを再帰的に探索するジェネレータ関数
export function* walk(rootPath) {
    // ファイル or ディレクトリかをstatSyncで判定
    const stat = fs.statSync(rootPath);

    if (stat.isDirectory()) {
        // ディレクトリ自信をまずyield
        yield { path: rootPath, isDirectory: true };

        // ディレクトリ内のエントリを再帰的に探索
        const entries = fs.readdirSync(rootPath);
        for (const entry of entries) {
            const fullPath = path.join(rootPath, entry);
            yield* walk(fullPath); // 再帰的に呼び出し
        }
    } else if (stat.isFile()) {
        // ファイルの場合
        yield { path: rootPath, isDirectory: false };
    }
    // シンボリックリンクやデバイスは無視
}