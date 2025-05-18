import {newHashTable} from "./index.js";

describe("HashTable", () => {
    let hashTable;

    beforeEach(() => {
        hashTable = newHashTable(10);
    });

    it("adds and retriesves values", () => {
        hashTable.put("key1", "value1");
        hashTable.put("key2", {value: "value2"});

        expect(hashTable.size).toBe(2);
        expect(hashTable.get("key1")).toBe("value1");
        expect(hashTable.get("key2")).toEqual({ value: "value2" }); // オブジェクトや配列の中身を比較
    });

    it("overWrites existing key", () => {
        hashTable.put("key2", { value: "value2" });
        hashTable.put("key2", "new value");

        expect(hashTable.get("key2")).toBe("new value");
        expect(hashTable.size).toBe(1); // 上書きなので、sizeは増えない
    });

    it("removes a key", () => {
        hashTable.put("key1", "value1");
        hashTable.put("key2", "value2");
        hashTable.remove("key2");

        expect(hashTable.get("key2")).toBeUndefined();
        expect(hashTable.size).toBe(1);
    })
})