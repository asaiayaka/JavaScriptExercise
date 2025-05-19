let o = {}; // oはObject.prototypeをプロトタイプに持つ
o.x = 1;

let p = Object.create(o); // pの[[Prototype]]はo
p.y = 2;

let q = Object.create(p); // qの[[Prototype]]はp
q.z = 3;

// 確認コード
console.log(o.isPrototypeOf(p)); // true - oはpのプロトタイプチェーン上にある
console.log(o.isPrototypeOf(q)); // true - oはqのプロトタイプチェーン上にある
console.log(p.isPrototypeOf(q)); // true - pはqのプロトタイプチェーン上にある

// Object
let obj = {};
console.log(Object.prototype.isPrototypeOf(obj));    // true
console.log(Object.prototype.isPrototypeOf(Object)); // false (Objectは関数オブジェクトなのでFunction.prototypeが関与)

// Array
let arr = [];
console.log(Array.prototype.isPrototypeOf(arr));  // true
console.log(Object.prototype.isPrototypeOf(arr)); // true (Array.prototypeの親がObject.prototype)

// Date
let data = new Date();
console.log(Date.prototype.isPrototypeOf(date));   // true
console.log(Object.prototype.isPrototypeOf(date)); // true (同様にDate.prototypeの親がObject.prototype)

// Map
let map = new Map();
console.log(Map.prototype.isPrototypeOf(map));    // true
console.log(Object.prototype.isPrototypeOf(map)); // true

// さらにFunction.prototypeの関係も確認
console.log(Function.prototype.isPrototypeOf(Object)); // true
console.log(Function.prototype.isPrototypeOf(Array));  // true
console.log(Function.prototype.isPrototypeOf(Date));   // true
console.log(Function.prototype.isPrototypeOf(Map));    // true