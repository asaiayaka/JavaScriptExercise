/* eslint-disable*/
for (let i = 0; i < 10; i++) {
    (function() {
        let i = 100;
    })();
    console.log(i);
}
console.log(i);

// 理由
// for (let i = 0; i < 10; i++) のiはブロックスコープの変数。
// 各ループで実行されるfunction() {let i = 100;}は、関数スコープ内のローカル変数なので、関数の外のiとは異なる。
// L6のconsole.log(i);はforのスコープ内のiを参照している。
// ループ終了後、L8のconsole.log(i)はforの外にはiが存在しないため、ReferenceErrorとなる。