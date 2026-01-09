import http from "http";
import url from "url";
import path from "path";
import fs from "fs";

// 指定ディレクトリをルートとしてHTTPサーバーを起動
function server(rootDirectory, port) {
    const server = new http.Server();

    server.listen(port);
    console.log("Listening on port", port);

    server.on("request", (request, response) => {
        const endpoint = url.parse(request.url).pathname;

        // 先頭の / を除去
        let filename = endpoint.substring(1);

        //  ../によるディレクトリ外アクセスを防止
        filename = filename.replace(/\.\.\//g, "");

        // 実際のファイルパス
        const filepath = path.resolve(rootDirectory, filename);

        // PUT: ファイルアップロード
        if (request.method === "PUT") {

            // 保存先ディレクトリを作成(存在しなければ)
            const dir = path.dirname(filepath);
            fs.mkdirSync(dir, { recursive: true });

            // 書き込みストリーム作成
            const writeStream = fs.createWriteStream(filepath);

            // リクエストボディをそのままファイルへ保存
            request.pipe(writeStream);

            writeStream.on("finish", () => {
                response.writeHead(201, { "Content-Type": "text/plain" });
                response.end("Uploaded\n");
            });

            writeStream.on("error", err => {
                response.writeHead(500, { "Content-Type": "text/plain" });
                response.end(err.message);
            });

            return;
        }

        // GET: ファイル取得
        if (request.method === "GET") {
            const stream = fs.createReadStream(filepath);

            stream.once("readable", () => {
                response.writeHead(200, { "Content-Type": "application/octet-stream" });
                stream.pipe(response);
            });

            stream.on("error", () => {
                response.writeHead(404, { "Content-Type": "text/plain" });
                response.end("Not Found\n");
            });

            return;
        }

        // その他のHTTPメソッド
        response.writeHead(405);
        response.end("Not Found\n");
    });
}

// 起動
server(process.argv[2] || "./data", parseInt(process.argv[3]) || 8000);