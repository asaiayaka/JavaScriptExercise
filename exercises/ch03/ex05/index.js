// LF: \n 1文字で改行を表す
// CRLF: \r\n 2文字で改行を表す
// CR: \r 古いMacで使われていた

// LF(\n)をCR+LF(\r\n)に変換
export function lfToCrlf(str) {
    return str.replace(/(?<!\r)\n/g, '\r\n'); // (?<!\r): 直前が\rではないという否定の後読み。/.../g: 全部に対して適用
}

// CR+LF(\r\n)をLF(\n)に変換
export function crlfToLf(str) {
    return str.replace(/\r\n/g, '\n');
}
