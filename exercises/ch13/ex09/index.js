// ---- ダミーの wait 関数 ----
function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
function wait1() { return wait(1000); }
function wait2() { return wait(2000); }
function wait3() { return wait(3000); }

// ---- ログ用 ----
function log(msg) { console.log(msg); }
function logA() { console.log("A"); }
function logB() { console.log("B"); }
function logC() { console.log("C"); }

// ---- エラーを投げる関数 ----
function errX() { throw new Error("X error"); }
function errY() { throw new Error("Y error"); }

// ---- 問題の関数群 ----

async function i1() {
  let v = 0;

  v = await Promise.any([
    wait1().then(() => 42),
    wait2()
      .then(() => (v = 100))
      .then(() => 0),
  ]);

  log(v);     // Promise.any の最初に解決された値
  await wait2();
  log(v);     // 後続の Promise の副作用が反映されるか
}

async function i2() {
  const v = await Promise.all([
    wait3().then(() => { logA(); return "A"; }),
    wait2().then(() => { logB(); return "B"; }),
    wait1().then(() => { logC(); return "C"; }),
  ]);
  log(v);     // ["A","B","C"]
}

async function i3() {
  let v = 42;
  try {
    await Promise.all([
      wait3().then(() => { v = 0; errX(); }),
      wait2().then(() => { logB(); return "B"; }),
      wait1().then(() => { errY(); }),
    ]);
  } catch (e) {
    log(e.message);   // 最初に reject したエラー
    log(v);           // その時点での v の値
    await wait3();
    log(v);           // wait3 後の v の値
  }
}

async function i4() {
  let v = 0;

  const p1 = async () => {
    await wait1();
    for (let i = 0; i < 5; i++) {
      const next = v + 1;
      await wait2();
      v = next;
    }
  };

  const p2 = async () => {
    for (let i = 0; i < 5; i++) {
      const next = v + 1;
      await wait2();
      v = next;
    }
  };

  await Promise.all([p1(), p2()]);
  log(v); // 最終的な v の値（競合の影響で必ずしも10にはならない）
}

// ---- 実行例 ----
(async () => {
  console.log("=== i1 ===");
  await i1();

  console.log("=== i2 ===");
  await i2();

  console.log("=== i3 ===");
  await i3();

  console.log("=== i4 ===");
  await i4();
})();
