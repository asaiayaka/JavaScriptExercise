# 解答

## index.js でdocument.cookie プロパティを console.logで表示する

![alt text]({08DA1807-93A7-4DAB-B799-C84019B5EF68}.png)
document.cookie:

CookieはHttpOnly属性がついているため、JavaScriptからCookieを読み取ることができず、document.cookieに表示されない
HttpOnlyは、JavaScriptからのアクセスを禁止するもの

## ブラウザの開発者コンソールで http://localhost:3000/ の Cookie を表示する

![alt text]({0FEADE3C-BEB2-45AF-9DBF-8FC0F63CE4B1}.png)
sid：ad8209e1-9d4c-455e-b809-57deeb88b9d2

## ToDo アプリのタブをリロードする

- document.cookie
![alt text]({07133859-46FC-439E-ADEA-98C367E720BD}.png)
document.cookie:

- sid:
![alt text]({2BDECC0A-CCAD-4DDA-8174-E75C169F1FA3}.png)
sid：ad8209e1-9d4c-455e-b809-57deeb88b9d2

- リロードしてもどちらも変わらない → サーバーは同じsidに紐づくタスク一覧を返す

## 同一ブラウザの異なるタブやウィンドウで http://localhost:3000/ を開いて ToDo リストの状態を確認する

同じ状態の画面が開く

理由：ブラウザは同一サイト（localhost:3000）へ同じCookieを送信するため同じセッションが共有されるから

## シークレットウィンドウや異なるブラウザで http://localhost:3000/ を開いて ToDo リストの状態を確認する

空のToDoリストが表示される

理由：シークレットウィンドウはCookieを共有しないため、サーバは新しいsidを発行し、独立したタスクリストを管理する

## http://127.0.0.1:3000/ を開いて ToDo リストの状態を確認する

空のToDoリストが表示される

理由：127.0.0.1とlocalhostはホスト名が違うため別オリジンのため、同じCookieは送信されない。サーバーは新しいsidを発行し、別のタスクリストを用意する
