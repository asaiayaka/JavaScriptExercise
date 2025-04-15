// Symbol()関数
const sym1 = Symbol("desc");
const sym2 = Symbol("desc");

// オブジェクトにSymbolをプロパティキーとして使う
const obj = {
    [sym1]: "value from sym1",
    [sym2]: "value from sym2",
};

// 各プロパティを取得
console.log(obj[sym1]);
console.log(obj[sym2]);

// Symbol.for()関数
const symA = Symbol.for("shared");
const symB = Symbol.for("shared");

// オブジェクトにSymbolをプロパティキーとして使う
const sharedObj = {
    [symA]: "value from shared symbol"
};

// 同じキーのSymbolでプロパティ取得
console.log(sharedObj[sym2]);
console.log(symA === symB);