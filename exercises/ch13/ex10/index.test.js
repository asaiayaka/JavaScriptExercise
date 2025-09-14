import {writeFile, mkdir, rm} from "fs/promises";
import { join } from "path";
import { fetchSumOfFileSizes } from ".";

describe("fetchSumOfFileSizes", () => {
    const testDir = join(process.cwd(), "test-temp-dir");

    beforeAll(async () => {
        await mkdir(testDir, { recursive: true });

        // テスト用ファイル作成
        await writeFile(join(testDir, "file1.txt"), "hello");  // 5バイト
        await writeFile(join(testDir, "file2.txt"), "world!"); // 6バイト
        await writeFile(join(testDir, "file3.txt"), "12345");  // 5バイト
        // 合計16バイト
    });

    afterAll(async () => {
        // テストディレクトリ削除（再帰的）
        await rm(testDir, {recursive: true, force: true });
    });

    test("ディレクトリ内のファイルサイズ合計を返す", async () => {
        const total = await fetchSumOfFileSizes(testDir);
        expect(total).toBe(16);
    });

    test("空のディレクトリの場合は0を返す", async () => {
        const emptyDir = join(testDir, "empty");
        await mkdir(emptyDir);

        const total = await fetchSumOfFileSizes(emptyDir);
        expect(total).toBe(0);
    });

    test("存在しないディレクトリを渡した場合はエラーを投げる", async () => {
        await expect(fetchSumOfFileSizes("nonexistent-path")).rejects.toThrow();
    });
});