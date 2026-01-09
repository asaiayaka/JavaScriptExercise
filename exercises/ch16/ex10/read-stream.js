import fs from "fs";

console.log("開始時メモリ(MB): ",
    (process.memoryUsage().rss / 1024 / 1024).toFixed(2)
);

let total = 0;

const stream = fs.createReadStream("file.txt");

stream.on("data", chunk => {
    total += chunk.length;
});

stream.on("end", () => {
    console.log("読み込んだサイズ:", total, "bytes");
    console.log("終了時メモリ(MB): ",
        (process.memoryUsage().rss / 1024 / 1024).toFixed(2) 
    );
});