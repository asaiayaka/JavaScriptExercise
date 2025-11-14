# 解答

## Active や Completed を pushState で選択した後にリロードするとどうなるか？

- hashchange版

    - URL: http://localhost:3000/ch15.04-10/ex11/index.html#/active
    - リロードしても必ずindex.htmlが返る
    - JavaScriptがURLのハッシュタグを読んで正しくフィルタリングする
    - そのため、正常に動作する

- pushState版
  - URL: http://localhost:3000/ch15.04-10/ex12/active
  - リロードすると GET /activeをサーバーに送信
  - 静的サーバーには/activeというファイルが存在しない
  - そのため、下のようなエラーが表示される
  - Error response
Error code: 404

Message: File not found.

Error code explanation: 404 - Nothing matches the given URI.

## サーバー側がどのような挙動をすれば pushState を使った実装が期待通り動作するか

Express：
app.use(express.static('public'));

app.get('*', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

Vite などの SPA フレームワークでもhistoryApiFallback: true が必要
