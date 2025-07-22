// 名前付きエクスポート：通常の関数
export function add(a, b) {
    return a + b;
}

// デフォルトエクスポート：クラス
export default class Calculator {
    multiply(a, b) {
        return a * b;
    }
}