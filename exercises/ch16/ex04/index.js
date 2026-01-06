// fsモジュール：ファイルを読み込むためのNode.js標準ライブラリ
import fs from 'fs';

// iconv-lite：文字コード変換を行う外部ライブラリ
import iconv from 'iconv-lite';

// 読み込むライブラリ名
const filePath = 'hello.txt';

// ファイルをバイナリとして読み込む
// ※encodingを指定しない
fs.readFile(filePath, (err, data) => {
    // エラーが発生した場合の処理
    if (err) {
        console.error('ファイルの読み込みに失敗しました：', err);
        return;
    }

    // Shift_JISで書かれたデータをUTF-8の文字列に変換する
    const text = iconv.decode(data, 'Shift_JIS');

    // 文字化けしない状態でコンソールに表示
    console.log(text);
});