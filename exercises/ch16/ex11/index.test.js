import net from "net";
import { spawn } from "child_process";
import path from "path";

function sendRawHttp(requestText) {
  return new Promise((resolve, reject) => {
    const client = net.connect(8000, "localhost", () => {
      client.write(requestText);
    });

    let data = "";

    client.on("data", (chunk) => (data += chunk.toString()));
    client.on("end", () => resolve(data));
    client.on("error", reject);

    // タイムアウト対策
    setTimeout(() => {
        reject(new Error("timeout waiting for response"));
    }, 3000);
  });
}

describe("net HTTPサーバーの動作確認", () => {
  let serverProcess;

  beforeAll(async () => {
    // テスト前にサーバーを起動する
    const serverPath = path.resolve("ch16/ex11/index.js");
    serverProcess = spawn("node", [serverPath], {
        stdio: "inherit", // サーバーログ見えるのでデバッグ案
    });
    await new Promise((r) => setTimeout(r, 300)); // 起動待ち
  });

  afterAll(() => {
    // テスト終了後にサーバーを停止
    serverProcess.kill();
  });

  test("GET / でHTMLフォームが返る", async () => {
    const res = await sendRawHttp("GET / HTTP/1.1\r\nHost: localhost\r\n\r\n");

    expect(res).toContain("200 OK");
    expect(res).toContain("<form");
    expect(res).toContain("Greeting Form");
  });

  test("POST / greetingで入力内容を含むHTMLが返る", async () => {
    const body = "name=Taro&greeting=Hello";

    const res = await sendRawHttp(
      "POST /greeting HTTP/1.1\r\n" +
        "Host: localhost\r\n" +
        "Content-Type: application/x-www-form-urlencoded\r\n" +
        `Content-Length: ${body.length}\r\n\r\n` +
        body
    );

    expect(res).toContain("200 OK");
    expect(res).toContain("Hello, Taro!");
  });

  test("存在しないパスは404が返る", async () => {
    const res = await sendRawHttp(
      "GET /unknown HTTP/1.1\r\nHost: localhost\r\n\r\n"
    );
    expect(res).toContain("404 Not Found");
  });

  test("メソッド違いは405が返る", async () => {
    const res = await sendRawHttp(
        "POST / HTTP/1.1\r\nHost: localhost\r\n\r\n"
    );
    expect(res).toContain("405 Method Not Allowed");
  });
});
