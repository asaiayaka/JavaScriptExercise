import crypto from "crypto";
import fs from "fs/promises"; // fs.promisesを使って非同期でファイル操作する

const KEY_FILE = "key.json";
const DATA_FILE = "encrypted.json";

// 鍵を生成する
function generateKey() {
    // 32バイト(256bit)の暗号論的疑似乱数を生成する
    // ここを埋める
    return crypto.randomBytes(32);
}

// 平文を鍵とAES-256-CBCで暗号化する。次に、暗号文と初期化ベクトル(IV)を、Base64エンコードして返す
function encrypt64(text, key) {
    // 16バイトの暗号論的疑似乱数を初期化ベクトル(IV)とする
    // ここを埋める
    // AESのブロックサイズは16バイト
    const iv = crypto.randomBytes(16);

    // AES-256-CBCのCipherオブジェクトを生成
    // crypto.createCipherivはcrypto.Cipherを返す
    const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);

    // 平文を暗号化
    // updateで暗号化し、finalで残りを出力
    const encrypted = Buffer.concat([
        cipher.update(text, "utf8"),
        cipher.final(),
    ]).toString("base64");

    // 暗号文とIVをbase64で返す
    return {
        value: encrypted, // Base64エンコード済み暗号文
        iv: iv.toString("base64"), // IVもBase64にして保存
    };
}

// generateKeyの返り値を、JSON形式でファイルに保存する(非同期)
async function writeKey(key) {
    // BufferはそのままJSONにできないためBase64に変換して保存
    const data = {
        key: key.toString("base64"),
    };
    await fs.writeFile(KEY_FILE, JSON.stringify(data, null, 2));
}

// encrypt64の返り値を、JSON形式でファイルに保存する(非同期)
async function writeEncrypt64(data) {
    await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2));
}

async function readKey() {
    // ファイルを鍵から読み込み
    const json = await fs.readFile(KEY_FILE, "utf8");
    const data = JSON.parse(json);

    // Base64からBufferに戻す
    return Buffer.from(data.key, "base64");
}

// ファイルから暗号データを読み込む(非同期)
async function readEncrypt64() {
    const json = await fs.readFile(DATA_FILE, "utf8");
    return JSON.parse(json);
}

// 復号して平文を返す
function decrypt64(data, key) {
    // Base64からBufferに戻す
    const iv = Buffer.from(data.iv, "base64");
    const encryptedText = Buffer.from(data.value, "base64");

    // 復号用のDecipher(Cipherの逆)
    const decipher = crypto.createDecipheriv(
        "aes-256-cbc",
        key,
        iv
    );

    // 復号処理
    const decrypted = decipher.update(encryptedText, undefined, "utf8") + decipher.final("utf8");
    return decrypted;
}

// 指定の平文を暗号化とBase64エンコードし、後に復号する一連の処理
(async () => {
    // 平文
    const text = "Hello, World!";

    // 暗号化とBase64エンコード
    const key = generateKey();
    const encryptedData = encrypt64(text, key);

    // 鍵と暗号データをJSONで保存
    await writeKey(key);
    await writeEncrypt64(encryptedData);

    console.log("Encrypted Text (Base64): ", encryptedData.value);

    // Base64でコードと復号
    const storedKey = await readKey();
    const storedEncryptedData = await readEncrypt64();
    const decryptedText = decrypt64(storedEncryptedData, storedKey);

    console.log("Decrypted Text: ", decryptedText);
})();