import net from "net";
import querystring from "querystring";

// フォームHTML(GET / 用)
const FORM_HTML = `<!doctype html>
<html lang="ja">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Greeting Form</title>
    </head>
    <body>
        <form action="/greeting" method="POST">
            <label for="greeting">Name:</label>
            <input type="text" id ="name" name="name" />
            <input type="text" id="greeting" name="greeting" />
            <button type="submit">Submit</button>
        </form>
    </body>
</html>`;

// HTTPレスポンスを組み立てる関数
function buildResponse(statusCode, statusText, headers, body) {
  let headerText = `HTTP/1.1 ${statusCode} ${statusText}\r\n`;
  for (const [k, v] of Object.entries(headers)) {
    headerText += `${k}: ${v}\r\n`;
  }
  return headerText + `\r\n` + body;
}

// TCPサーバー作成
const server = net.createServer((socket) => {
  let buffer = "";

  // クライアントからデータが届くたびに呼ばれる
  socket.on("data", (chunk) => {
    buffer += chunk.toString("utf8");

    // HTTPではヘッダとボディは\r\n\r\nで区切られる
    if (!buffer.includes("\r\n\r\n")) {
      return;
    }

    // HTTPリクエスト解析
    const [headerPart, bodyPart = ""] = buffer.split("\r\n\r\n");

    const lines = headerPart.split("\r\n");
    const [method, path] = lines[0].split(" ");

    const headers = {};
    for (let i = 1; i < lines.length; i++) {
      const [k, v] = lines[i].split(": ");
      headers[k.toLowerCase()] = v;
    }

    // 1."/"が GET されたとき以下の HTML を返却する
    // ルーティング処理
    // GET/
    if (method === "GET" && path === "/") {
      const res = buildResponse(
        200,
        "OK",
        {
          "Content-Type": "text/html; charset=UTF-8",
          "Content-Length": Buffer.byteLength(FORM_HTML),
        },
        FORM_HTML
      );
      socket.write(res);
      socket.end();
      return;
    }

    // 2. 1.のフォームから/greetingに POST されたとき、nameとgreeting の内容をボディに含む HTML を返却する
    // POST /greeting
    if (method === "POST" && path === "/greeting") {
      // application/x-www-form-urlencoded　を解析
      const params = querystring.parse(bodyPart);

      const name = params.name || "";
      const greeting = params.greeting || "";

      const html = `<!doctype html>
    <html lang="ja">
    <head><meta charset="UTF-8"></head>
    <body>
            <h1>${greeting}, ${name}!</h1>
            <a href="/">back</a>
        </body>
        </html>`;

      const res = buildResponse(
        200,
        "OK",
        {
            "Content-Type": "text/html; charset=UTF-8",
            "Content-Length": Buffer.byteLength(html)
        },
        html
      );
      socket.write(res);
      socket.end();
      return;
    }

    // 3. 1.2.3.で非対応のパスとメソッドの組み合わせでアクセスされた場合、HTTP のプロトコルにしたがい 404 または 405 を返す
    // パスは存在するがメソッド違い → 405
    if (
        (path === "/" && method !== "GET") ||
        (path === "/greeting" && method !== "POST")
    ) {
        const body = "Method Not Allowed";
        const res = buildResponse(
            405,
            "Method Not Allowed",
            {
                "Content-Type": "text/plain",
                "Content-Length": body.length
            },
            body
        );
        socket.write(res);
        socket.end();
        return;
    }

    // それ以外 → 404
    const body = "Not Found";
    const res = buildResponse(
        404,
        "Not Found",
        {
            "Content-Type": "text/plain",
            "Content-Length": body.length
        },
        body
    );
    socket.write(res);
    socket.end();
  });
});

// 起動
server.listen(8000, () => {
    console.log("net HTTP server listening on 8000");
});
