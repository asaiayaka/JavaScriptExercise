import { promises as fs } from "fs";
import path from "path";

/**
 * ディレクトリを非同期で再帰的に探索する非同期ジェネレータ関数
 * 
 * @param {string} rootPath - 探索を開始するルートパス
 * @yields {Object} - { path: string, isDirectory: boolean }
 */
export async function* walk(rootPath) {
    const stat = await fs.stat(rootPath);

    if (stat.isDirectory()) {
        // ディレクトリ自体をyield
        yield { path: rootPath, isDirectory: true };

        // ディレクトリの中身を読み取って再帰的に探索
        const entries = await fs.readdir(rootPath);
        for (const entry of entries) {
            const fullPath = path.join(rootPath, entry);
            yield* walk(fullPath); // 再帰呼び出し
        }
    } else if (stat.isFile()) {
        // ファイルの場合
        yield { path: rootPath, isDirectory: false };
    }
    // シンボリックリンクや特殊ファイルは無理
}