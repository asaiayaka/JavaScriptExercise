import { monthSwitch } from './switch.js';

describe("monthSwitch", () => {
    it("should return true for months with 31 days", () => {
        expect(monthSwitch('Jan')).toBe(true);  // Janは31日
        expect(monthSwitch('Mar')).toBe(true);  // Marは31日
        expect(monthSwitch('May')).toBe(true);  // Mayは31日
        expect(monthSwitch('Jul')).toBe(true);  // Julは31日
        expect(monthSwitch('Aug')).toBe(true);  // Augは31日
        expect(monthSwitch('Oct')).toBe(true);  // Octは31日
        expect(monthSwitch('Dec')).toBe(true);  // Decは31日
    });

    it("should return false for months without 31 days", () => {
        expect(monthSwitch('Feb')).toBe(false);  // Febは31日ではない
        expect(monthSwitch('Apr')).toBe(false);  // Aprは31日ではない
        expect(monthSwitch('Jun')).toBe(false);  // Junは31日ではない
        expect(monthSwitch('Sep')).toBe(false);  // Sepは31日ではない
        expect(monthSwitch('Nov')).toBe(false);  // Novは31日ではない
    });

    it("should return false for invalid month names", () => {
        expect(monthSwitch('InvalidMonth')).toBe(false);  // 不正な月名に対してfalseを返す
        expect(monthSwitch('123')).toBe(false);  // 数字を渡してもfalse
    });
});
