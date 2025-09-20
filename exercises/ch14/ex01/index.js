// 1.書き換え不可・削除不可のオブジェクトを返す関数
export function unwritableAndUnconfigurableObj() {
    const obj = {};
    Object.defineProperty(obj, "a", {
        value: 1,
        writable: false, // 値を書き換え不可
        configurable: false, // 削除不可
        enumerable: true // JSON.stringifyやテスト比較で見えるように
    });
    return obj;
}

// 2.書き換え可能・削除不可のオブジェクトを返す関数
export function writableAndUnconfigurableObj() {
    const obj = {};
    Object.defineProperty(obj, "b", {
        value: 2,
        writable: true, // 値を書き換え可能
        configurable: false, // 削除不可
        enumerable: true
    });
    return obj;
}

// ネスト↓全階層が拡張不可のオブジェクトを返す関数
export function nestedUnwritableObj() {
    const obj = { c: { d: {e: 3} } };

    // 再帰的にObject.preventExtensionsを適用する関数
    function deepFreezeExtensions(o) {
        Object.preventExtensions(o); // 新しいプロパティ追加を禁止
        for (const key of Object.keys(o)) {
            if (typeof o[key] === "object" && o[key] !== null) {
                deepFreezeExtensions(o[key]); // ネストされたオブジェクトにも適用
            }
        }
    }
    deepFreezeExtensions(obj);
    return obj;
}