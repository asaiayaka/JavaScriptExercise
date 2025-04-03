// 絶対値を返す関数
export function abs(n) {
    return Math.abs(n);
}

// 合計を返す関数
export function sum(m) {
    return m.reduce((acc, val) => acc + val, 0);
}

// 階乗を返す関数
export function factorial(l) {
    if (l < 0) {return undefined;}
    if (l === 0) {return 1;}
    return l * factorial(l-1);
}