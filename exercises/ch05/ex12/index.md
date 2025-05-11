# 結果

## non_strict.cjsの実行結果

> node exercises/ch05/ex12/non_strict.cjs
<ref *1> Object [global] {
  global: [Circular *1],
  clearImmediate: [Function: clearImmediate],
  setImmediate: [Function: setImmediate] {
    [Symbol(nodejs.util.promisify.custom)]: [Getter]
  },
  clearInterval: [Function: clearInterval],
  clearTimeout: [Function: clearTimeout],
  setInterval: [Function: setInterval],
  setTimeout: [Function: setTimeout] {
    [Symbol(nodejs.util.promisify.custom)]: [Getter]
  },
  queueMicrotask: [Function: queueMicrotask],
  structuredClone: [Function: structuredClone],
  atob: [Getter/Setter],
  btoa: [Getter/Setter],
  performance: [Getter/Setter],
  fetch: [Getter/Setter],
  crypto: [Getter]
}
Hello from non strict

= globalオブジェクトの中身

## strict.jsの実行結果

> node exercises/ch05/ex12/strict.js     
undefined
file:///C:/Users/r23600307/Desktop/exercises-public/exercises/ch05/ex12/strict.js:3
    this.message = "Hello from non strict";
                 ^

TypeError: Cannot set properties of undefined (setting 'message')
    at showThis (file:///C:/Users/r23600307/Desktop/exercises-public/exercises/ch05/ex12/strict.js:3:18)
    at file:///C:/Users/r23600307/Desktop/exercises-public/exercises/ch05/ex12/strict.js:6:1
    at ModuleJob.run (node:internal/modules/esm/module_job:222:25)
    at async ModuleLoader.import (node:internal/modules/esm/loader:323:24)
    at async loadESM (node:internal/process/esm_loader:28:7)
    at async handleMainPromise (node:internal/modules/run_main:113:12)

Node.js v20.12.1

## strict_fixed.jsの実行結果

> node exercises/ch05/ex12/strict_fixed.js
{}
Hello from strict-fixed!

→console.log(context);
関数内で obj を表示 → {}（まだプロパティが追加されていない）

context.message = "Hello from strict-fixed!";
obj に message プロパティが追加される。

console.log(obj.message);
結果として "Hello from strict-fixed!" と出力される。
