# 解答

## 2.index.html ファイル内の script タグから type="module" 属性を削除した場合、期待通り動作させるにはどうすべきか答えなさい。

- defer属性を追加
  deferを付けると、HTMLがすべて読み込まれた後にスクリプトが実行されるため、DOM操作が安全になる
  <script src="/ch15.01-03/ex01/index.js" defer></script>

- DOMContentLoadedイベントを使う
  document.addEventListener("DomContentLoaded", () => {
    <!-- コードを書く -->
  });