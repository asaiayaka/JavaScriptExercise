import { any, catching} from "./index.js";

describe("any", () => {
    test("すべての関数が false を返す場合は false を返す", () => {
        const isNonZero = any(
            (n) => n > 0,
            (n) => n < 0
        );
        expect(isNonZero(0)).toBe(false);
    });
    test("1つでも true を返す関数があれば true を返す", () => {
        const isNonZero = any(
            (n) => n > 0,
            (n) => n < 0
        );
        expect(isNonZero(42)).toBe(true);
        expect(isNonZero(-1)).toBe(true);
    });
    test("1つだけ関数を渡した場合も正しく動作する" , () => {
        const isPositive = any((n) => n > 0);
        expect(isPositive(1)).toBe(true);
        expect(isPositive(-1)).toBe(false);
    })
})

describe("catching", () => {
    test("最初の関数が正常に実行された場合はその結果を返す", () => {
        const safeParse = catching(JSON.parse, (e) => ({error: e.toString()}));
        const json = '{"a": 1}';
        expect(safeParse(json)).toEqual({ a: 1 });
    });
    test("最初の関数が例外を投げた場合はエラー処理の結果を返す", () => {
        const safeParse = catching(JSON.parse, (e) => ({ error: e.toString() }));
        const invalidJson = "{not: valid}";
        const result = safeParse(invalidJson);
        expect(result).toHaveProperty("error");
        expect(result.error).toMatch(/SyntaxError/);
    });
    test("JSON.parse 以外の関数でも正しく動作する", () => {
        const parseIntSafe = catching((s) => {
            if (isNaN(parseInt(s))) {
                throw new Error("Invalid number");
            }
            return parseInt(s);
        }, (e) => ({ failed: true, reason: e.message }));

        expect(parseIntSafe("123")).toBe(123);
        expect(parseIntSafe("abc")).toEqual({ failed: true, reason: "Invalid number" });
    });
});