// acornをインストール
// npm install acorn

import * as acorn from "acorn";
import fs from "fs";

const code = `
let a;
a = 3;
console.log(a);
`;

const ast = acorn.parse(code, {ecmaVersion: 2020});

// JSONを整形してファイルに書き込む
fs.writeFileSync("ast_output.json", JSON.stringify(ast, null, 2));

console.log("ASTが 'ast_output.json' に保存されました。");

// 実行
// node parse.js
