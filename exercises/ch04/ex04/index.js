export function bitCount(n) {
    // 32ビット符号付き整数として扱う
    n = n >>> 0; // 符号なし整数にする
    
    let count = 0;
    while (n !== 0) { // nが0になるまでループ
        count += n & 1; // 最下位ビットが1ならカウント
        n = n >>> 1; // 1ビット右にシフト(ゼロ埋め)
    }
    return count;
}