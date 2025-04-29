import {f} from './index'

describe("f", () => {

    // 偶数の値だけが抽出されるか確認
    it("returns a new object with only even number values", () => {
      const input = { x: 1, y: 2, z: 3 };
      expect(f(input)).toEqual({ y: 2 });
    });
  
    // 偶数が1つもない場合は空オブジェクトを返す
    it("returns an empty object when no even values", () => {
      const input = { a: 1, b: 3, c: 5 };
      expect(f(input)).toEqual({});
    });
  
    // すべて偶数の場合は同じオブジェクト構造が返される
    it("returns the same key-value pairs when all values are even", () => {
      const input = { a: 2, b: 4, c: 6 };
      expect(f(input)).toEqual({ a: 2, b: 4, c: 6 });
    });
  
    // 元のオブジェクトが変更されていないことを確認
    it("does not modify the original object", () => {
      const input = { a: 1, b: 2, c: 3 };
      const original = { ...input }; // コピーを取って比較
      f(input);
      expect(input).toEqual(original);
    });
  
    // 数値以外の値は無視されるかをチェック
    it("ignores non-number values", () => {
      const input = { a: 2, b: "not a number", c: true, d: 4 };
      expect(f(input)).toEqual({ a: 2, d: 4 });
    });
  
  });
  