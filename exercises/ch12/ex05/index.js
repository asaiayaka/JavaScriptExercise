import fs from "fs";

export function* readLines(filePath) {
    const fd = fs.openSync(filePath, "r"); // ファイルを開く
    const bufferSize = 1024; // 1KB単位で読み込む
    const buffer = Buffer.alloc(bufferSize);

    let leftover = ""; // 改行で分割できずに残った部分

    try {
        while (true) {
            const bytesRead = fs.readSync(fd, buffer, 0, bufferSize, null);
            if (bytesRead === 0) {
                break; // EOF到達
            }

            leftover += buffer.toString("utf8", 0, bytesRead);
            const lines = leftover.split("\n");
            leftover = lines.pop(); // 最後は改行なしの残り

            for (const line of lines) {
                yield line; // 改行を除いた文字列を返す
            }
        }

        // ファイル末尾が開業で終わらない場合、最後の残りを返す
        if (leftover.length > 0) {
            yield leftover;
        }
    } finally {
        fs.closeSync(fd); // 必ずファイルをクローズする
    }
}