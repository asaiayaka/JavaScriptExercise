# 解答

## AES

共通鍵暗号方式の一種で暗号化と複合に同じ鍵を使う。現在もっとも広く使われている安全な暗号アルゴリズム

## Base64

暗号ではなく、バイナリデータを文字列に変換する表現形式。
主な用途：
    - JSON
    - HTTP
    - ファイル保存
なぜ暗号文をBase64にするかというと、AESの暗号文はバイナリなので、そのままではJSONに保存できず、文字化けするため。
Base64にすると安全に保存・転送できる

## 実行結果

以下は、暗号化とBase64エンコード、Base64デコードと復号のサンプルコードです。穴埋めして完成させなさい。なお、穴埋め箇所ではcrypto.CipherとBuffer.fromを使用しなさい。
なお、暗号化のアルゴリズムはaes-256-cbcを指定しなさい。

import crypto from "crypto";
// ここを埋める

// 鍵を生成する
function generateKey() {
  // 32バイトの暗号論的疑似乱数を生成する
  // ここを埋める
}

// 平文を鍵とAES-256-CBCで暗号化する。次に、暗号文と初期化ベクトル(IV)を、Base64エンコードして返す。
function encrypt64(text, key) {
  // 16バイトの暗号論的疑似乱数を初期化ベクトル (IV) とする
  // ここを埋める

  // 暗号化とBase64エンコード
  // ここを埋める

  // 暗号文とIVをbase64で返す
  return {
    value: encryptedBase64,
    iv: iv.toString("base64"),
  };
}

// generateKeyの返り値を、JSON形式でファイルに保存する(非同期)
async function writeKey(key) {
  // ここを埋める（fs.promisesで鍵を保存）
}

// encrypt64の返り値を、JSON形式でファイルに保存する(非同期)
async function writeEncrypt64(data) {
  // ここを埋める（fs.promisesで暗号データを保存）
}

async function readKey() {
  // ここを埋める（return Promise<鍵>）
}

// ファイルから暗号データを読み込む (非同期)
async function readEncrypt64() {
  // ここを埋める（return Promise<data>）
}

// 復号して平文を返す
function decrypt64(data, key) {
  // ここを埋める
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

  console.log("Encrypted Text (Base64):", encryptedData.value);

  // Base64デコードと復号
  const storedKey = await readKey();
  const storedEncryptedData = await readEncrypt64();
  const decryptedText = decrypt64(storedEncryptedData, storedKey);

  console.log("Decrypted Text:", decryptedText);
})();
