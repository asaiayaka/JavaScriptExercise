import fs from "fs";
import path from "path";
import { walk } from ".";

// テスト用の一時ディレクトリを作成する関数
function setupTestDir() {
    const baseDir = path.join(process.cwd(), "temp_walk_test");
    fs.mkdirSync(baseDir, { recursive: true });

    // 前回の残骸を削除してから作成
    if (fs.existsSync(baseDir)) {
        fs.rmSync(baseDir, { recursive: true, force: true });
    }
    fs.mkdirSync(baseDir, { recursive: true });

    // サブディレクトリ作成
    const subDir = path.join(baseDir, "subdir");
    fs.mkdirSync(subDir, { recursive: true });

    // ファイル作成
    fs.writeFileSync(path.join(baseDir, "file1.txt"), "hello");
    fs.writeFileSync(path.join(subDir, "file2.txt"), "world");

    return baseDir;
}

// 後始末
function cleanupTestDir(dir) {
    fs.rmSync(dir, { recursive: true, force: true });
}

describe("walk ジェネレータ関数", () => {
    test("ディレクトリとファイルを再帰的に探索できる", () => {
        const rootDir = setupTestDir();

        const results = [...walk(rootDir)];

        // 取得したpathとisDirectoryを比較
        const simplified = results.map((x) => ({
            name: path.basename(x.path),
            isDirectory: x.isDirectory,
        }));

        // 結果を確認（順番はディレクトリ優先、再帰的に下へ）
        expect(simplified).toEqual(
            expect.arrayContaining([
                { name: "temp_walk_test", isDirectory: true },
                { name: "file1.txt", isDirectory: false },
                { name: "subdir", isDirectory: true },
                { name: "file2.txt", isDirectory: false }
            ])
        );

        cleanupTestDir(rootDir);
    });
});