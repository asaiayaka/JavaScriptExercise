// 通ってない
import puppeteer from 'puppeteer-core';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 自分の環境の Chrome or Edge のパスを指定
const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

describe('integrityテスト', () => {
    let browser;
    let page;

    beforeAll(async () => {
        browser = await puppeteer.launch({
            headless: true,
            executablePath: chromePath,
        });
        page = await browser.newPage();
    });

    afterAll(async () => {
        await browser.close();
    });

    test('正しいintegrityではスクリプトが実行される', async () => {
        const logs = [];
        page.on('console', msg => logs.push(msg.text()));

        await page.goto(`file://${__dirname}/index.html`, {
            waitUntil: 'load'
        })
        expect(logs).toContain('index.jsが読み込まれました');
    });

    test('誤ったintegrityではスクリプトが実行されない', async () => {
        const logs = [];
        page.on('console', msg => logs.push(msg.text()));

        await page.goto(`file://${__dirname}/index.html`, {
            waitUntil: 'load'
        })
        
        // 誤ったintegrityのscriptは失敗するので、ログが1回しか出ない
        const filtered = logs.filter(l => l === 'index.jsが読み込まれました');
        expect(filtered.length).toBe(1);
    });
});