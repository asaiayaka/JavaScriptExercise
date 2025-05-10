let a = 1;
let b = 2;
let obj = { a: 3, b: 4 };

obj.a = obj.b; // 変更点

console.log({ a, b, obj });