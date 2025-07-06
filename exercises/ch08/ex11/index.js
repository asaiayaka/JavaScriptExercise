// 組み込み関数
const builtIn = Array.prototype.push;

// 自作関数の例
function myFunction(a, b) {
    return a + b;
}

// toStringの出力を表示
console.log("組み込み関数の toString: ");
console.log(builtIn.toString());

console.log("\n自作関数の toString: ");
console.log(myFunction.toString());