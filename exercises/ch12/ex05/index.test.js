import fs from "fs";
import path from "path";
import { readLines } from ".";

// テスト用の一時ファイルを作成する関数
function createTempFile(content) {
    const tmpPath = path.join(process.cwd(), "temp_test_file.txt");
    fs.writeFileSync(tmpPath, content, "utf8");
    return tmpPath;
}

describe("readLines ジェネレータ関数", () => {
    test("改行区切りで1行ずつ読み込める", () => {
        // テスト用ファイルを作成
        const tmpFile = createTempFile("apple\nbanana\ncherry\n");
        
        const result = [...readLines(tmpFile)];
        // 改行は含まれず、行ごとに取得できることを確認
        expect(result).toEqual(["apple", "banana", "cherry"]);

        fs.unlinkSync(tmpFile); // ファイル削除
    });

    test("末尾に改行がない場合も最後の行を返す", () => {
        const tmpFile = createTempFile("line1\nline2\nlastLineWithoutNewline");

        const result = [...readLines(tmpFile)];
        expect(result).toEqual(["line1", "line2", "lastLineWithoutNewline"]);

        fs.unlinkSync(tmpFile);
    });

    test("途中でbreakしてもファイルがクローズされる", () => {
        const tmpFile = createTempFile("a\nb\nc\nd\n");

        const g = readLines(tmpFile);

        // 最初の2行だけ取得してbreak
        let result = [];
        for (const line of g) {
            result.push(line);
            if (result.length === 2) {
                break;
            }
        }

        // 2行だけ取得できる
        expect(result).toEqual(["a", "b"]);

        // すでにbreakしているので、ジェネレータを消費しなくてもcloseSyncは呼ばれているはず
        // ここではエラーが出ないことを確認するため
        expect(() => fs.unlinkSync(tmpFile)).not.toThrow();
    });
});