# 解答

## AMD（Asynchronous Module Definition

主にブラウザで使われ、非同期でモジュールを読み込む。代表ライブラリは RequireJS。

## UMD（Universal Module Definition

CommonJS・AMD・グローバル変数すべてに対応する汎用形式。ライブラリの配布に多く使われた。

## SystemJS

モジュールローダー仕様（ES Module Loader Spec）に基づく。複数のモジュール形式に対応できるダイナミックローダー。

## IIFE（Immediately Invoked Function Expression）

モジュール機能が標準化される前に使われていた自己実行関数ベースのパターン。名前空間汚染防止に使われた。

## Globals（Script タグによるグローバルスコープ）

もっとも古い形式。モジュール機能なしで、読み込まれたスクリプトの内容がすべてグローバルスコープに展開される。
