// 足し算を行う関数
export function add(a, b) {
    return a + b;
}

// 計算を行うクラス
export class Calculator {
    constructor(name) {
        this.name = name;
    }

    // 2つの数値を掛け算するメソッド
    multiply(a, b) {
        return a * b; // 掛け算の結果を返す
    }
}