# 解答

当時はブラウザのHistory APIが十分に普及しておらず、JavaScriptで動的にページ内容を切り替えるSPAを作ると、URLが変更されてもページ遷移として扱えなかった。
そこで、#を使うことで、ブラウザにページ遷移させずにURLを変更できる方法が採用された。
!を付けた理由はGoogleが提唱したAJAX Crawling Schemeによるもの
    - #!を付けると、検索エンジンがAJAXページをクローラで正しく読み込めるようになる
    - 例：example.com/#!/active → Googleが内部的に?_escaped_fragment_=/activeに変換して内容を取得
