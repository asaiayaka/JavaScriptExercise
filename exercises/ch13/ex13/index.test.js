import { promises as fs } from "fs";
import path from "path";
import { walk } from ".";

describe("非同期ジェネレータ walk", () => {
    const testDir = path.join(process.cwd(), "test-walk-dir");

    beforeAll(async () => {
        // 既存のテスト用ディレクトリを削除
        await fs.rm(testDir, { recursive: true, force: true });
        // テスト用ディレクトリ構造を作成
        await fs.mkdir(testDir, { recursive: true });
        await fs.mkdir(path.join(testDir, "A"));
        await fs.mkdir(path.join(testDir, "B", "C"), { recursive: true });

        await fs.writeFile(path.join(testDir, "foo.txt"), "foo");
        await fs.writeFile(path.join(testDir, "B", "C", "buz.txt"), "buz");
    });

    afterAll(async () => {
        // テスト終了後にディレクトリを削除
        await fs.rm(testDir, { recursive: true, force: true });
    });

    test("ディレクトリとファイルを再帰的に探索できる", async () => {
        const results = [];
        for await (const elem of walk(testDir)) {
            // パスをtestDir基準に相対化して格納
            results.push({
                path: path.relative(testDir, elem.path),
                isDirectory: elem.isDirectory,
            });
        }

        expect(results).toEqual(
            expect.arrayContaining([
                { path: "A", isDirectory: true },
                { path: "B", isDirectory: true },
                { path: path.join("B", "C"), isDirectory: true },
                { path: "foo.txt", isDirectory: false },
                { path: path.join("B", "C", "buz.txt"), isDirectory: false },
            ])
        );
    });
});