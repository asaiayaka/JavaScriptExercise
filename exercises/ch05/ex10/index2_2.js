let a = 1;
let b = 2;
let obj = { b: 4 };

a = obj.b; // 変更点

console.log({ a, b, obj });