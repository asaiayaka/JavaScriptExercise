export function sum(arr) {
    if (!arr) return 0;
    return arr.reduce((acc, val) => acc + val, 0);
}

export function join(arr, sep = ",") {
    if (!arr) throw new Error("No array provided");
    return arr.reduce((acc, val, i) =>
    acc + (i === 0 ? "" : sep) + (val === null ? "" : String(val)), "" // i===0の時(先頭)は区切りを入れない
    );
}

export function reverse(arr) {
    if (!arr) throw new Error("No array provide");
    return arr.reduce((acc, val) => [val, ...acc], []);
}

export function every(arr, callback) {
    return arr.reduce((acc, val, i) => {
        if (!acc) return false;
        if (!(i in arr)) return acc; // インデックスに実際に値が存在するか確認。スパース(穴)配列の空要素はスキップ。空要素の場合はfalseを返す
        return callback(val, i, arr); // callback関数に引数を指定すると、それら（要素、インデックス、配列）をもとに外から好きな条件で判定できる
    }, true); // 初期値true
}

export function some(arr, callback) {
    return arr.reduce((acc, val, i) => {
        if (acc) return true;
        if (!(i in arr)) return acc;
        return callback(val, i, arr);
    }, false); // ひとつでもtrueならいいので、初期値はfalse
}