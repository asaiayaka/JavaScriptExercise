# 解答

## @babel/preset-typescriptとtscの違い

| 項目 | @babel/preset-typescript | tsc |
| --- | --- | --- |
| 主目的 | トランスパイル | トランスパイル + 型チェック |
| 型チェック | 行わない | 行う |
| 出力速度 | 高速 | 比較的遅い |
| 設定の簡単さ | 他のBabel設定と統合 | tsconfigが必要 |
| JSX対応 | React向けに簡単 | 標準対応 |
| 出力制御 | 限定的 | 詳細に制御可能 |

## Babelの特徴

- TypeScriptの方を削除するだけ
- 構文変化に特化
- webpackとの統合が容易
- 型エラーは検出できない

## tscの特徴

- TypeScriptの公式コンパイラ
- 厳密な型チェック
- 型定義ファイル(.d.ts)の生成が可能

## 実務的な使い分け

Babel + tsc併用が一般的
Babel：ビルド
tsc：型チェックのみ
