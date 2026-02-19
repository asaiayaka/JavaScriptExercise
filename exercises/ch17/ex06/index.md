# 解答

## webpack の設定でバンドル時にソースマップを生成するようにしなさい

webpack.config.js で以下を指定

```
devtool: "source-map"
```

バンドルを作成
ターミナルで以下を実行（ch17/ex05 ディレクトリで）：

```
npx webpack --config webpack.config.js
```

ローカルサーバー立ち上げ

npm install -g http-server
http-server .

index.js
![alt text]({1E70AE3B-313E-4B9C-861D-3F8A280733ED}.png)

ブレイクポイントを貼っても変わらない（張る場所が違う？）

![alt text]({C4638136-FEB0-4DF4-A772-FBCA454ACBC4}.png)
