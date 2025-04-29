import { fibonacciWhile } from "./while";
import { fibonacciDoWhile} from "./doWhile";
import { fibonacciFor } from "./for";

describe("fibonacciWhile", () => {
    it("returns the first 10 Fibonacci numbers", () => {
      expect(fibonacciWhile(10)).toEqual([1, 1, 2, 3, 5, 8, 13, 21, 34, 55]);
    });
  });
  
  describe("fibonacciDoWhile", () => {
    it("returns the first 10 Fibonacci numbers", () => {
      expect(fibonacciDoWhile(10)).toEqual([1, 1, 2, 3, 5, 8, 13, 21, 34, 55]);
    });
  });
  
  describe("fibonacciFor", () => {
    it("returns the first 10 Fibonacci numbers", () => {
      expect(fibonacciFor(10)).toEqual([1, 1, 2, 3, 5, 8, 13, 21, 34, 55]);
    });
  });
  