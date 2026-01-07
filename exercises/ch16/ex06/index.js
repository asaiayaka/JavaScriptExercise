import fs from "fs";

const filename = "test.bin";

// 最初のデータを書き込む(ASCII文字)
const initialData = Buffer.from("ABC", "utf8"); // 41 42 43
fs.writeFileSync(filename, initialData);

console.log("最初のファイルサイズ：", fs.statSync(filename).size, "bytes");

// truncateでファイルを拡張する(例：10バイトにする)
fs.truncateSync(filename, 10);

console.log("拡張後のファイルサイズ：", fs.statSync(filename).size, "bytes");
console.log("truncate完了。バイナリエディタでtest.binを確認してください");
