// プロトタイプとなるオブジェクト
let protoObj = {
    1: "proto_1", // 数値プロパティ(列挙可能)
    2: "proto_2", // 数値プロパティ(列挙可能)
    a: "proto_a", // 文字列プロパティ(列挙可能)
    b: "proto_b"  // 文字列プロパティ(列挙可能)
};

// 子オブジェクトを作り、protoObjをプロトタイプに設定
let childObj = Object.create(protoObj);

// 1.プロトタイプと同名の数値プロパティ(オーバーライド)
childObj[1] = "own_1";

// 2.プロトタイプと異なる数値プロパティ
childObj[100] = "own_100";

// 3.プロトタイプと同名の文字列プロパティ(オーバーライド)
childObj.a = "own_a";

// 4.プロトタイプと異なる文字列プロパティ
childObj.z = "own_z";

// 5.プロトタイプと同名のプロパティ、列挙不可
Object.defineProperty(childObj, 'b', {
    value: "own_b_non_enum",
    enumerable: false // ←非列挙
});

// --- for...inループでプロパティを列挙 ---
console.log("=== for...in 順番チェック===");
for (let key in childObj) {
    if (childObj.hasOwnProperty(key)) {
        console.log(`自分のプロパティ: ${key} → ${childObj[key]}`);
    } else {
        console.log(`継承プロパティ: ${key} → ${childObj[key]}`);
    }
}