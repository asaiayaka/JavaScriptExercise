import {add, sub, mul, div} from "../ex01/index"

describe("Complex Number Operations", () => {
  
    describe("add", () => {
      it("adds two complex numbers", () => {
        const a = { real: 2, imag: 3 };
        const b = { real: 1, imag: 4 };
        expect(add(a, b)).toEqual({ real: 3, imag: 7 });
      });
    });
  
    describe("sub", () => {
      it("subtracts two complex numbers", () => {
        const a = { real: 2, imag: 3 };
        const b = { real: 1, imag: 4 };
        expect(sub(a, b)).toEqual({ real: 1, imag: -1 });
      });
    });
  
    describe("mul", () => {
      it("multiplies two complex numbers", () => {
        const a = { real: 2, imag: 3 };
        const b = { real: 1, imag: 4 };
        expect(mul(a, b)).toEqual({ real: -10, imag: 11 });
      });
    });
  
    describe("div", () => {
      it("divides two complex numbers", () => {
        const a = { real: 2, imag: 3 };
        const b = { real: 1, imag: 4 };
        const result = div(a, b);
        expect(result.real).toBeCloseTo(0.8235, 4);
        expect(result.imag).toBeCloseTo(-0.2941, 4);
      });
    });
  
  });