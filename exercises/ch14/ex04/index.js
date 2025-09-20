// ひらがなクラス
export class Hiragana {
    constructor(char) {
        if (typeof char !== "string" || char.length !== 1) {
            throw new Error("Hiraganaクラスはひらがな1文字を受け取ります");
        }
        this.char = char;
        this.code = char.charCodeAt(0);
    }

    // 型変換の挙動を定義
    [Symbol.toPrimitive](hint) {
        if (hint === "number") {
            // 数値が期待される場面ではUTF-16コード単位を返す
            return this.code;
        }
        // それ以外（"default"）ではひらがなを返す
        return this.char;
    }
}