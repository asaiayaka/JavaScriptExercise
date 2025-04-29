export function f(obj) {
    const result = {};
    for (const key in obj) {
        if (typeof obj[key] === 'number' && obj[key] % 2 === 0) { // 値が数値であり、偶数である場合のみ
            result[key] = obj[key]; // 結果に追加
        }
    }
    return result;
}