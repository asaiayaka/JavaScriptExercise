# 解答

VS Code のリファクタ機能（F2）を使って、モジュール側の関数・クラス名を変更した。
名前付きエクスポートは、インポート側にも正しく追従された。
デフォルトエクスポートについては、インポート名は手動で変更する必要があることを確認。
再エクスポートされた関数名も、インポート先に対して追従が確認できた。

## 実行結果

import {add as addTwoNumbers, Calculator} from './mathUtils.js'

const calc = new MyCalculator("MyCalc");
↓
export class MyCalculator {

export class MyCalculator {
↓
export default class DefaultCalc {

export { add as addTwoNumbers } from './mathUtils.js'
↓
import { addTwoNumbers } from './reexport.js';
