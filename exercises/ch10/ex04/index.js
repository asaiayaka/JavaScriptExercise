// デフォルトインポート：Calculatorクラスをインポート
import Calc from './mathUtils.js' // 名前を変更してインポート

// 再エクスポートされた関数をインポート
import { addNumbers } from './reexport.js';

const calculator = new Calc();
console.log("2 * 3 = ", calculator.multiply(2, 3));
console.log("2 + 3 = ", addNumbers(2, 3));