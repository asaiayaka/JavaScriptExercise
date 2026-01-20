// 事前宣言＋後代入は可読性が低いため避ける
// let a, x, y;
const r = 10;

// with文はESLint, Google Styleで禁止
// with (Math){
//   a = PI  * r * r;
//   x = r * cos(PI);
//   y = r * sin(PI / 2);
// }

const a = Math.PI * r * r;
const x = r * Math.cos(Math.PI);
const y = r * Math.sin(Math.PI / 2);

console.log(a, x, y);
