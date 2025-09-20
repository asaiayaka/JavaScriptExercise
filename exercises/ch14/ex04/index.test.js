import { Hiragana } from ".";

describe("Hiraganaクラス", () => {
    test("プロパティを持つこと", () => {
        const h = new Hiragana("あ");
        expect(h.char).toBe("あ");
        expect(h.code).toBe("あ".charCodeAt(0));
    });

    test("文字列変換でひらがなを返す", () => {
        const h = new Hiragana("い");
        expect(String(h)).toBe("い");
        expect(`${h}`).toBe("い");
    });

    test("数値変換でコード単位を返す", () => {
        const h = new Hiragana("う");
        expect(Number(h)).toBe("う".charCodeAt(0));
        expect(+h).toBe("う".charCodeAt(0));
    });

    test("比較演算子でコード順比較ができる", () => {
        const a = new Hiragana("あ");
        const i = new Hiragana("い");
        expect(a < i).toBe(true); // "あ"のコードは"い"より小さい
        expect(i > a).toBe(true);
    });

    test("配列ソートで50音順になる", () => {
        const arr = [new Hiragana("い"), new Hiragana("あ"), new Hiragana("え")];
        const sorted = arr.sort((x, y) => x - y);
        expect(sorted.map(String)).toStrictEqual(["あ", "い", "え"]);
    });

    test("default ヒントではひらがなを返す", () => {
        const h = new Hiragana("お");
        expect(h + "!").toBe("お!");
    });
});