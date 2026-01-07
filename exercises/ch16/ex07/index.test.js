import fs from "fs";
import path from "path";
import { checkEntry } from "./index.js";

const testDir = "test_tmp_dir";
const testFile = "test_tmp_file.txt";

beforeAll(() => {
    // テスト用ディレクトリを作成
    if (!fs.existsSync(testDir)) {
        fs.mkdirSync(testDir);
    }

    // テスト用ファイルを作成
    fs.writeFileSync(testFile, "test");
});

afterAll(() => {
    // テスト終了後に生成したファイル・ディレクトリを削除
    if (fs.existsSync(testFile)) {
        fs.unlinkSync(testFile);
    }

    if (fs.existsSync(testDir)) {
        fs.rmdirSync(testDir);
    }
});

describe("checkEntry関数のテスト", () => {
    test("通常ファイルを指定すると'file'を返す", () => {
        const result = checkEntry(testFile);
        expect(result).toBe("file");
    });

    test("ディレクトリを指定すると'directoryを返す", () => {
        const result = checkEntry(testDir);
        expect(result).toBe("directory");
    })

    test("存在しないパスを指定すると'not-found'を返す", () => {
        const result = checkEntry("no_such_path_12345");
        expect(result).toBe("not-found");
    });
});