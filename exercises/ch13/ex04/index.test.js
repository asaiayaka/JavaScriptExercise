import { fetchFirstFileSizes, fetchSumOfFileSizes } from ".";
import * as fs from "node:fs/promises";
import * as path from "node:path";
import { describe } from "node:test";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const testDir = path.join(__dirname, "test-data");

beforeAll(async () => {
    // テスト用ディレクトリを作成
    await fs.mkdir(testDir, { recursive: true });

    // サンプルファイルを作成
    await fs.writeFile(path.join(testDir, "a.txt"), "hello"); // 5バイト
    await fs.writeFile(path.join(testDir, "b.txt"), "world!"); // 6バイト
});

afterAll(async () => {
    // テスト終了後、ディレクトリを削除
    await fs.rm(testDir, { recursive: true, force: true });
});

describe("fetchFirstFilesSize", () => {
    test("最初のファイルのサイズを取得できる", async () => {
        const size = await fetchFirstFileSizes(testDir);
        // 最初のファイルはOSに依存してa.txtまたはb.txt
        expect([5, 6]).toContain(size);
    });

    test("空ディレクトリならnullを返す", async () => {
        const emptyDir = path.join(testDir, "empty");
        await fs.mkdir(emptyDir, { recursive: true });

        const size = await fetchFirstFileSizes(emptyDir);
        expect(size).toBeNull();
    });
});

describe("fetchSumOfFileSizes", () => {
    test("すべてのファイルサイズの合計を取得できる", async () => {
        const sum = await fetchSumOfFileSizes(testDir);
        expect(sum).toBe(11); // "hello"(5) + "world!"(6) = 11
    });

    test("空ディレクトリなら0を返す", async () => {
        const emptyDir = path.join(testDir, "empty2");
        await fs.mkdir(emptyDir, { recursive: true });

        const sum = await fetchSumOfFileSizes(emptyDir);
        expect(sum).toBe(0);
    });
});