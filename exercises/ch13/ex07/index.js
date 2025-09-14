// ダミーの wait 関数 (ms 後に resolve)
function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
function wait1() { return wait(1000); }
function wait2() { return wait(2000); }
function wait3() { return wait(3000); }

// ログ用関数
function log(msg) { console.log(msg); }
function logA() { console.log("A"); }
function logB() { console.log("B"); }
function logC() { console.log("C"); }

// エラーを投げる関数
function errX() { throw new Error("X error"); }
function errY() { throw new Error("Y error"); }

// ---- 問題文の関数群 ----

async function h1() {
  try {
    await wait3();
    logA();
    await wait2();
    logB();
    await wait1();
    logC();
  } catch (e) {
    log(e.message);
  }
}

function h2() {
  // NOTE: h3 との比較用
  new Promise(() => {
    errX();
  }).catch((e) => log(e.message));
}

function h3() {
  // NOTE: new Promise の引数が async function の場合、例外はどう扱われるだろう
  new Promise(async () => {
    errX();
  }).catch((e) => log(e.message));
}

async function h4() {
  // NOTE: 2つの例外は両方 catch できるか？
  try {
    const p1 = wait2().then(() => {
      errX();
    });
    const p2 = wait1().then(() => {
      errY();
    });
    await p1;
    await p2;
  } catch (e) {
    log(e.message);
  }
}

// 実行例
(async () => {
  console.log("=== h1 ===");
  await h1();

  console.log("=== h2 ===");
  h2();

  console.log("=== h3 ===");
  h3();

  console.log("=== h4 ===");
  await h4();
})();
