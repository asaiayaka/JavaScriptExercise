let a = 1;
let b = 2;
let obj = { b: 4 };
with (obj) {
  a = b;
}
console.log({ a, b, obj });
