"use strict";

let obj = {};

Object.defineProperty(obj, 'test', {
    value: 123,
    writable: false,
    enumerable: false,
    configurable: false
});

console.log("初期値：", obj.test);

// 値の変更
try {
    obj.test = 456;
} catch (e) {
    console.log("値の変更時エラー:", e.message);
}
console.log("変更後(writable: false):", obj.test);

// 削除
try {
    delete obj.test;
} catch (e) {
    console.log("削除時エラー:", e.message);
}
console.log("削除後(configurable: false):", obj.test);

// hasOwnProperty
console.log("hasOwnProperty:", obj.hasOwnProperty('test')); // trueになるはず！

// propertyIsEnumerable
console.log("propertyIsEnumerable:", obj.propertyIsEnumerable('test')); // false

// for...in
for (let key in obj) {
    console.log("for...in:", key); // 出てこない
}

// Object.keys
console.log("Object.keys:", Object.keys(obj)); // []
