import {add, Calculator} from './mathUtils.js'

// add関数を使って加算
const result1 = add(3, 5);
console.log("加算の結果: " + result1);

// Calculatorクラスを使って掛け算
// クラスのインスタンスを作成
const calc = new Calculator("MyCalc");

// multiplyメソッドを使って掛け算
const result2 = calc.multiply(4, 6);
console.log("掛け算の結果: " + result2);