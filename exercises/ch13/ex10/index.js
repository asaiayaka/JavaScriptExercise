import { readdir, stat } from "fs/promises"
import { join } from "path";

/**
 * ディレクトリ内のファイルサイズの合計を返す
 * promise.allを使って平行にファイルサイズを取得する
 * 
 * @param {string} path - 読み込むディレクトリのパス
 * @returns {Promise<number>} - ファイルサイズの合計（バイト単位）
 */
export async function fetchSumOfFileSizes(path) {
    try {
        const files = await readdir(path);

        // 各ファイルのstatをPromiseとして生成
        const sizePromises = files.map(async (file) => {
            const stats = await stat(join(path, file));
            return stats.size;
        });

        // Promise.allで全ファイルサイズを並行に取得
        const sizes = await Promise.all(sizePromises);

        // 合計を取得
        return sizes.reduce((acc, size) => acc + size, 0);
    } catch (err) {
        throw err;
    }
}