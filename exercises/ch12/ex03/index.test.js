import { counterGenerator } from ".";

describe("counterGenerator", () => {
    let gen;

    beforeEach(() => {
        gen = counterGenerator();
    });

    test("通常のカウントが増加すること", () => {
        expect(gen.next().value).toBe(0);
        expect(gen.next().value).toBe(1);
        expect(gen.next().value).toBe(2);
    });

    test("throw()でカウンタがリセットされること", () => {
        gen.next(); // 0
        gen.next(); // 1
        gen.throw('reset'); // カウンタを0にリセット
        expect(gen.next().value).toBe(0); // リセット後の最初の値は0
        expect(gen.next().value).toBe(1); // 再びカウントアップ
    });

    test("ほかの例外はストーされること", () => {
        gen.next(); // 0
        expect(() => gen.throw(new Error('unexpected'))).toThrow('unexpected');
    });
});