import { promises as fs } from "fs";
import { join } from "path";
import { fetchFirstFileSize, fetchSumOfFileSizes } from ".";

// テスト用にディレクトリを作成
const tmpDir = join(process.cwd(), "test_tmp");

beforeAll(async () => {
  await fs.mkdir(tmpDir, { recursive: true });

  // ファイルを準備
  await fs.writeFile(join(tmpDir, "a.txt"), "hello"); // 5バイト
  await fs.writeFile(join(tmpDir, "b.txt"), "world!"); // 6バイト
});

afterAll(async () => {
  // ディレクトリごと再帰削除
  await fs.rm(tmpDir, { recursive: true, force: true });
});

describe("fetchFirstFileSize", () => {
  test("最初のファイルのサイズを取得できる", async () => {
    const size = await fetchFirstFileSize(tmpDir);
    expect(size).toBe(5);
  });

  test("空ディレクトリならnullを返す", async () => {
    const emptyDir = join(tmpDir, "empty");
    await fs.mkdir(emptyDir);
    const size = await fetchFirstFileSize(emptyDir);
    expect(size).toBeNull();
    await fs.rmdir(emptyDir);
  });
});

describe("fetchSumOfFileSizes", () => {
  test("全ファイルのサイズの合計を取得できる", async () => {
    const total = await fetchSumOfFileSizes(tmpDir);
    // a.txt(5) + b.txt(6) = 11
    expect(total).toBe(11);
  });

  test("空ディレクトリなら0を返す", async () => {
    const emptyDir = join(tmpDir, "empty2");
    await fs.mkdir(emptyDir);
    const total = await fetchSumOfFileSizes(emptyDir);
    expect(total).toBe(0);
    await fs.rmdir(emptyDir);
  });
});
