function collectionPropertyNames(obj) {
    let result = [];

    // 1.自信のすべてのプロパティ(文字列 + Symbol, 列挙可否問わず)
    let ownKeys = [
        ...Object.getOwnPropertyNames(obj),  // 文字列型のプロパティ
        ...Object.getOwnPropertySymbols(obj) // Symbolもプロパティ
    ];
    result.push(...ownKeys);

    // 2.列挙可能な継承プロパティ(Symbolは対象外)
    let proto = Object.getPrototypeOf(obj);
    // ここから
}