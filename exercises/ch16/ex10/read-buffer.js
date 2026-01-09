import fs from "fs";

console.log("開始時メモリ(MB): ",
    (process.memoryUsage().rss / 1024 / 1024).toFixed(2)
);

fs.readFile("file.txt", (err, data) => {
    if (err) {
        throw err;
    }

    console.log("読み込んだサイズ：", data.length, "bytes");
    console.log("終了時メモリ(MB)：", 
        (process.memoryUsage().rss / 1024 / 1024).toFixed(2)
    );
});