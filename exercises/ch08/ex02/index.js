// ループ版：反復による二分法
export function powerLoop(x, n) {
    let result = 1;
    let base = x;
    let exponent = n;

    while (exponent > 0) {
        // nが奇数の時はresultにbaseを掛ける
        if (exponent % 2 === 1) {
            result *= base;
        }

        // baseを2乗して、指数を半分にする
        base *= base;
        exponent = Math.floor(exponent / 2);
    }
    return result;
}

// 再帰版：再帰による二分法
export function powerRecursive(x, n) {
    if (n === 0) {
        return 1;
    }
    const half = powerRecursive(x, Math.floor(n / 2));

    // nが偶数: x^n = (x^(n/2))^2
    if (n % 2 === 0) {
        return half * half;
    } else {
        // nが奇数: x^n = x * (x^((n-1)/2))^2
        return x * half * half;
    }
}