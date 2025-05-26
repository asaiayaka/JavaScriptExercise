export function collectionPropertyNames(obj) {
    let result = [];

    // 1.自信のすべてのプロパティ(文字列 + Symbol, 列挙可否問わず)
    let ownKeys = [
        ...Object.getOwnPropertyNames(obj),  // 文字列型のプロパティ
        ...Object.getOwnPropertySymbols(obj) // Symbolもプロパティ
    ];
    result.push(...ownKeys);

    // 2.列挙可能な継承プロパティ(Symbolは対象外)
    let proto = Object.getPrototypeOf(obj);
    while (proto !== null) {
        for (let key in proto) {
            // for...in で出てくるのは列挙可能なプロパティのみ
            if (!obj.hasOwnProperty(key) && !result.includes(key)) {
                result.push(key); // 継承されていて、まだ追加されていないもの
            }
        }
        proto = Object.getPrototypeOf(proto);
    }
    return result;
}