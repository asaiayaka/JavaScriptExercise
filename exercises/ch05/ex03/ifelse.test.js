import { monthIfElse } from './ifelse.js';

describe("monthIfElse", () => {
    it("should return true for months with 31 days", () => {
        expect(monthIfElse('Jan')).toBe(true);  // Janは31日
        expect(monthIfElse('Mar')).toBe(true);  // Marは31日
        expect(monthIfElse('May')).toBe(true);  // Mayは31日
        expect(monthIfElse('Jul')).toBe(true);  // Julは31日
        expect(monthIfElse('Aug')).toBe(true);  // Augは31日
        expect(monthIfElse('Oct')).toBe(true);  // Octは31日
        expect(monthIfElse('Dec')).toBe(true);  // Decは31日
    });

    it("should return false for months without 31 days", () => {
        expect(monthIfElse('Feb')).toBe(false);  // Febは31日ではない
        expect(monthIfElse('Apr')).toBe(false);  // Aprは31日ではない
        expect(monthIfElse('Jun')).toBe(false);  // Junは31日ではない
        expect(monthIfElse('Sep')).toBe(false);  // Sepは31日ではない
        expect(monthIfElse('Nov')).toBe(false);  // Novは31日ではない
    });

    it("should return false for invalid month names", () => {
        expect(monthIfElse('InvalidMonth')).toBe(false);  // 不正な月名に対してfalseを返す
        expect(monthIfElse('123')).toBe(false);  // 数字を渡してもfalse
    });
});
