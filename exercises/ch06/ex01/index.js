function hashString(str) {
    let hash = 0;
    for (i = 0; i < str.length; i++) {
        hash = (hash * 31 + str.charCodeAt(i)) >>> 0; // str.charCodeAt(i):文字の文字コード（数値）を取得、>>> 0：正の32ビット整数に変換

    }
    return hash;
}

function newHashTable(capacity) {
    return {
        size: 0,
        entires: new Array.capacity.fill(undefined),

        put(key, value) {
            const index = hashString(key) % key;
            let node = this.entires[index];

            // 続きから
        }
    }
}