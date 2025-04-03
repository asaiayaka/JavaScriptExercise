import { abs, sum, factorial } from "./index.js";

// TypeScript の場合は以下:
// import { abs, sum, factorial } from "./index.ts";

describe("math", () => {
  describe("abs", () => {
    it("returns same value when positive value given", () => {
      expect(abs(42)).toBe(42);
    });

    it("returns negated value when negative value given", () => {
      expect(abs(-42)).toBe(42);
    });

    it("returns zero value when zero given", () => {
      expect(abs(0)).toBe(0);
    });
  });

  // 以下に sum, factorial のテストを記載せよ
  // sum
  describe("sum", () => {
    it("returns the sum of all values in the array", () => {
      expect(sum[1,2,3,4]).toBe(10);
    });

    it("returns zero when the array is empty", () => {
      expect(sum([])).toBe(0);
    });
  });

  // factorial
  describe("factorial", () => {
    it("returns 1 for 0", () => {
      expect(factorial(0)).toBe(1);
    });

    it("returns the correct factorial for positive numbers", () => {
      expect(factorial(5)).toBe(120);
    });

    it("returns undefined for negative numbers", () => {
      expect(factorial(-1)).toBeUndefined();
    });
  });
});
