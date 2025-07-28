/**
 * 32ビット符号なし整数のUint32Arrayを受け取り、
 * リトルエンディアンのバイト順からビッグエンディアンに変換して返す
 */
export function littleToBigEndian(uint32Array) {
    const result = new Uint32Array(uint32Array.length);
    for (let i = 0; i < uint32Array.length; i++) {
        const value = uint32Array[i];
        // 各バイトを抽出して逆順に並べる
        const b0 = (value >>> 0) & 0xff;
        const b1 = (value >>> 8) & 0xff;
        const b2 = (value >>> 16) & 0xff;
        const b3 = (value >>> 24) & 0xff;
        // ビッグエンディアンとして再構築
        result[i] = (b0 << 24) | (b1 << 16) | (b2 << 8) | b3;
    }
    return result;
}

/**
 * 32ビット符号なし整数のUint32Arrayを受け取り、
 * ビッグエンディアンのバイト順からリトルエンディアンに変換して返す
 */
export function bigToLittleEndian(uint32Array) {
    // エンディアン変換は対称なので、同じ処理でOK
    return littleToBigEndian(uint32Array);
}