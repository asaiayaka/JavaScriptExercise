import { promises as fs } from "fs";
import { join } from "path";

/**
 * 指定したディレクトリの最初のファイルのサイズを取得する
 * - ディレクトリが空の場合はnullを返す
 * - エラーが起きた場合はthrowする
 */
export async function fetchFirstFileSize(path) {
    // ディレクトリ内のファイル一覧を取得
    const files = await fs.readdir(path);

    if (files.length === 0) {
        return null; // 空フォルダならnull
    }

    // 最初のファイルのstatを取得
    const stats = await fs.stat(join(path, files[0]));
    return stats.size;
}

/**
 * 指定したディレクトリ内の全ファイルサイズの合計を取得する
 * - ディレクトリが空なら0を返す
 * - エラーが起きた場合はthrowする
 */
export async function fetchSumOfFileSizes(path) {
    const files = await fs.readdir(path);

    let total = 0;
    for (const file of files) {
        const stats = await fs.stat(join(path, file));
        total += stats.size;
    }

    return total;
}