# 結果

## JavaScript グローバルオブジェクトの参照方法と仕様差について

- グローバルオブジェクトの参照方法
  - 実行環境：ブラウザ
  - 参照方法：windowまたはself
  - ブラウザ環境のグローバルオブジェクト。windowは最上位スコープを表し、selfはWeb Worker内でも利用可能

  - 実行環境Node.js
  - 参照方法：global
  - Node.js環境におけるグローバルオブジェクト
  
  - 環境を問わず（共通）
  - 参照方法：globalThis
  - ES2020で導入された標準的なグローバルオブジェクト参照方法。すべての実行環境で共通。

  - コード例
// ブラウザ環境
console.log(window === globalThis); // true

// Node.js 環境
console.log(global === globalThis); // true

## ブラウザとNode.jsのグローバルオブジェクト

- 共通して存在する主なプロパティ・メソッド
  - globalThis
  - console
  - setTimeout(), setInterval(), clearTimeout(), clearInterval()
  - Promise
  - Array, Object, Map, Setなどの標準ビルドインオブジェクト
- ブラウザ独自のプロパティ・メソッド
  - window：ブラウザのグローバルスコープを指す
  - document：DOM（文章オブジェクトモデル）を操作するためのオブジェクト
  - navigator：ブラウザやOS情報、位置情報APIなどを提供
  - location：現在のURL情報を保持・変更可能
  - history：ページ遷移履歴を管理
  - alert(), confirm(), prompt()：ユーザーとの簡易ダイアログ表示機能
  - fetch()：HTTP通信を行うAPI。Node.jsではv18以降で標準化
  - locationStorage/sessionStorage：永続・セッション単位のデータ保存
  - screen：画像サイズ・解像度などの情報を取得
  - addEventListener()：グローバルスコープでイベントを登録可能
- Node.js独自のプロパティ
  - process：実行中のプロセス情報を取得
  - __dirname, __filename：現在のファイル・ディレクトリパス
  - require()：モジュール読み込み関数
  - Buffer：バイナリデータを扱うためのクラス
  - module, exports：モジュールシステムに関連するオブジェクト
  
## undefinedの定義と過去の問題

- 現在の仕様
  - undefinedはグローバルオブジェクトの読み込み専用プロパティ
  - 再代入は不可能であり、安全に使用できる

例：
undefined = 123;
console.log(undefined); // → undefined（上書きされない）

 - 過去の仕様の問題点
    - 旧仕様ではundefinedが書き換え可能な変数であった
    - 開発者た外部スクリプトが謝って上書きすると、比較や条件分岐が壊れる問題が発生
例：
undefined = 100;  // ← 上書き可能だった
console.log(undefined); // → 100

この問題を回避するため、当時は「安全な未定義値」を扱うために次のように対策されていた

安全な描き方（過去の対策例）：
var undef;  // 値を代入しない → 自然に undefined になる
if (x === undef) {
  // 安全な undefined 比較
}

または即時関数でundefinedを引数に取って固定化する方法も使われた：
(function(undefined) {
  // このスコープ内の undefined は安全に使用できる
})();
