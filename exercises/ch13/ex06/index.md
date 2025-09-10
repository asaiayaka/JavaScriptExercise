# 解答

## jQuery DeferredとPromiseの関係性

1. jQuery Deferredとは

- jQuery1.5で導入された非同期処理を管理する仕組み
- 当時JavaScriptにはまだPromiseが標準化されておらず、Ajaxのコールバック地獄を避けるために用意された
- $.Deferred()を使って生成し、.done(), .fail(), .always()などで処理を登録する

2. Promiseとの違い

|項目|jQuery Deferred|Promise
|標準化|jQuery独自実装|ECMAScript2015で標準化|
|成功処理|.done()|.then()|
|失敗処理|.fail()|.catch()|
|常に実行|.always()|.finally()|
|状態変更|.resolve(), .reject()|コンストラクタのresolve, reject|
|コールバック実行|登録済みなら即時実行のこともある|常に非同期（マイクロタスク）|

3. 関係性

- DeferredはPromiseの先駆け的存在
- 発想は同じ（非同期処理をオブジェクトで管理）が、挙動やAPIは異なる
- 現在はPromiseを使うのが基本
- 既存のjQueryコードではDeferredが残っていることもあるので、違いを理解しておくと移行や共存がやりやすい
