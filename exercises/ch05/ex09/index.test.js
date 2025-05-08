import { parseJSONSafe } from "./index";

describe("parseJSONSafe", () => {
    it("returns true", () => {
      expect(parseJSONSafe('{"name": "Alice", "age": 30}')).toStrictEqual({ success: true, data: { name: 'Alice', age: 30 } }
      );
    });
    it("returns false", () => {
        const result = parseJSONSafe('{name: "Alice"}');
        expect(result.success).toBe(false);
        expect(result.error).toContain("position");
      });
})
