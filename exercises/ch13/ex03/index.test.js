import { readdirPromise, statPromise, readdirPromisified, statPromisified } from ".";
import * as fs from "node:fs";
import * as path from "node:path";
import { describe } from "node:test";
import { fileURLToPath } from "node:url";

// ESMで__dirnameを再現する
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


describe("Promiseコンストラクタでラップしたfs関数", () => {
    test("readdirPromiseで現在のディレクトリを読み取れる", async () => {
        const files = await readdirPromise(__dirname);
        expect(Array.isArray(files)).toBe(true);
        expect(files).toContain("index.js"); // このファイルが含まれているはず
    });

    test("statPromiseでファイルの情報を取得できる", async () => {
        const files = await readdirPromisified(__dirname);
        expect(Array.isArray(files)).toBe(true);
        expect(files).toContain("index.js");
    });
});

describe("util.promisifyでラップしたfs関数", () => {
    test("readdirPromisifiedで現在のディレクトリを読み取れる", async () => {
        const files = await readdirPromisified(__dirname);
        expect(Array.isArray(files)).toBe(true);
        expect(files).toContain("index.js");
    });

    test("statPromisifiedでファイル情報を取得できる", async () => {
        const stats = await statPromisified(path.join(__dirname, "index.js"));
        expect(stats.isFile()).toBe(true);
    });
});