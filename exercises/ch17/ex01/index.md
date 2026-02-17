# 解答

## package.jsonに追記した箇所

"lint": "eslint ."
→ プロジェクト全体を ESLint で lint するコマンド。Google JavaScript Style Guide に従った設定でバグ検知や構文チェックを行うためのもの。

"format": "prettier --write ."
→ プロジェクト全体を Prettier でフォーマットし、コードを自動修正するコマンド。Googleスタイルに近いフォーマット設定で整形される。

実行コマンド：

```bash
ch17> npm install --save-dev eslint-config-google eslint-config-prettier

added 4 packages, and audited 6 packages in 305ms

found 0 vulnerabilities
```

```bash
ch17> npm run format ex01/format_sample.js

> ch17@1.0.0 format
> prettier --write . ex01/format_sample.js

ex01/format_sample.js 60ms
```
