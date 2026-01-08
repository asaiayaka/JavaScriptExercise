import { TextEncoder, TextDecoder } from "util";
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

import fs from "fs";
import path from "path";
import app from "./index.js";

let request;

describe("HTTP Server Test", () => {
  const testDir = path.resolve("./testdata");

  beforeAll(async () => {
    // ★ supertest を TextEncoder 設定後に読み込む
    const mod = await import("supertest");
    request = mod.default;
    // テスト用ディレクトリとファイル作成
    fs.mkdirSync(testDir, { recursive: true });
    fs.writeFileSync(path.join(testDir, "hello.txt"), "Hello World");

    // サーバーが参照するルートディレクトリを設定
    process.env.ROOT_DIR = testDir;
  });

  afterAll(() => {
    fs.rmSync(testDir, { recursive: true, force: true });
  });

  // mirrorのテスト
  test("/test/mirrorはリクエストをそのまま返す", async () => {
    const res = await request(app)
      .post("/test/mirror")
      .set("X-Test", "abc")
      .send("BODY");

    expect(res.status).toBe(200);
    expect(res.text).toContain("POST /test/mirror HTTP/");
    expect(res.text).toContain("x-test: abc");
    expect(res.text).toContain("BODY");
  });

  // 静的ファイル提供のテスト
  test("静的ファイルが取得できる", async () => {
    const res = await request(app).get("/hello.txt");

    expect(res.status).toBe(200);
    expect(res.text).toBe("Hello World");
  });

  // 404のテスト
  test("存在しないファイルは404", async () => {
    const res = await request(app).get("/no_such_file.txt");

    expect(res.status).toBe(404);
  });
});
