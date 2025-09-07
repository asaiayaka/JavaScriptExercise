import * as fs from "node:fs/promises";
import * as path from "node:path";

/**
 * fetchFirstFileSizes:
 * 指定ディレクトリ内の最初のファイルのサイズを取得する
 * - ファイルが存在しない場合はnullを返す
 * - エラーが発生した場合はrejectされる
 */
export async function fetchFirstFileSizes(dirPath) {
    // ディレクトリ内のファイル一覧を取得
    const files = await fs.readdir(dirPath);
    if (files.length === 0) {
        return null;
    }

    // 最初のファイルの情報を取得
    const stats = await fs.stat(path.join(dirPath, files[0]));
    return stats.size;
}

/**
 * fetchSumOfFileSizes:
 * 指定ディレクトリ内のすべてのファイルサイズの合計を返す
 * - ディレクトリが空なら0を返す
 * - エラーが発生した場合はrejectされる
 */
export async function fetchSumOfFileSizes(dirPath) {
    // ファイル一覧を取得
    const files = await fs.readdir(dirPath);

    // 各ファイルのstatを並列で取得
    const statsArray = await Promise.all(
        files.map((file) => fs.stat(path.join(dirPath, file)))
    );

    // sizeの合計を返す
    return statsArray.reduce((sum, stats) => sum + stats.size, 0);
}