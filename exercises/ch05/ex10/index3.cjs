let a = 1;
let b = 2;
let obj = { a: 3 };
with (obj) {
  a = b;
}
console.log({ a, b, obj });
