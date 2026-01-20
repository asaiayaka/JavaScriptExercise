module.exports = {
  parserOptions: {
    sourceType: "module",
  },
  extends: ["eslint:recommended", "prettier"],
  env: {
    es2022: true,
    node: true,
    jest: true,
    browser: true,
  },
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  // Google JavaScript Style Guide を基本にし、
  // フォーマットに関するルールは Prettier に委ねる
  extends: [
    "google",
    "prettier",
  ],
  // 課題指定：
  // format_sample.js は lint 対象から除外する
  ignorePatterns: [
    "ex01/format_sample.js",
    "ex11/*"
  ],
  rules: {
    // 本のサンプルコードが基本的にconstを使っていないためerrorからwarnに緩和する。
    // 通常業務ではほぼ確実に採用されるルールのため、offにはしない。
    "prefer-const": "warn",
  },
  root: true,
};
