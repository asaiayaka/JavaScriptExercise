import express from "express";
import fs from "fs";
import path from "path";
import url from "url";

const app = express();

// リクエストボディをそのまま扱うため、生のストリームを利用する
// (mirrorでrequest.pipe(response)したいので、body-parserは使わない)

// /test/mirrorエンドポイント
// リクエストの内容をそのままレスポンスに返す(デバッグ用)

app.all("/test/mirror", (req, res) => {
  // Content-Typeをプレーンテキストに設定
  res.set("Content-Type", "text/plain; charset=UTF-8");
  res.status(200);

  // リクエストライン相当の情報を出力
  res.write(`${req.method} ${req.originalUrl} HTTP/${req.httpVersion}\r\n`);

  // すべてのリクエストヘッダを出力
  for (const [key, value] of Object.entries(req.headers)) {
    res.write(`${key}: ${value}\r\n`);
  }

  // ヘッダとボディの区切りの空行
  res.write("\r\n");

  // リクエストボディをそのままレスポンスへコピー
  req.pipe(res);
});

// 静的ファイル提供
// それ以外のパスはすべてファイルとして扱う
app.get("*", (req, res) => {
  // ファイルを提供するルートディレクトリ
  const ROOT_DIR = process.env.ROOT_DIR || "/tmp";
  // URLパスから先頭の / を削除してファイル名にする
  let filename = req.path.substring(1);
  if (filename === "") {
    filename = "index.html";
  }

  // ../によるディレクトリ外参照を防止(簡易的な対策)
  filename = filename.replace(/\.\.\//g, "");

  // ルートディレクトリからの絶対パスを作る
  const fullpath = path.resolve(ROOT_DIR, filename);

  // 拡張子からContent-Typeを決定
  let type;
  switch (path.extname(fullpath)) {
    case ".html":
    case ".htm":
      type = "text/html";
      break;
    case ".js":
      type = "text/javascript";
      break;
    case ".css":
      type = "text/css";
      break;
    case ".png":
      type = "image/png";
      break;
    case ".txt":
      type = "text/plain";
      break;
    default:
      type = "application/octet-stream";
  }

  // ファイルをストリームで読み込む
  const stream = fs.createReadStream(fullpath);

  // 正常に読み込み可能になったらレスポンス送信開始
  stream.once("readable", () => {
    res.set("Content-Type", type);
    res.status(200);
    stream.pipe(res);
  });

  // エラーが起きた場合(存在しない・権限なしなど)
  stream.on("error", (err) => {
    res.set("Content-Type", "text/plain; charset=UTF-8");
    res.status(404).send(err.message);
  });
});

export default app;
