# 解答

## 予想

- h1
  A
  B
  C

理由：awaitにより処理が順番に実行されるから

- h2
　エラー

理由：new Promise(executor)のexecutor内で例外が投げられた場合はrejectされるはず。
しかしここではerrXが未定義なので即座に同期的にエラーが発生。
その時点ではまだ.catchが登録されていないため、Promiseが作られる前に例外が外に投げられる→catchは動かず未捕捉エラーになる。

- h3
　エラー

理由：executorがasyncの場合、関数の中で発生した例外は「Promiseのreject」として扱われる。よって、catchが呼ばれ、log(e.message)によりエラーが出力される

- h4
  エラー

  理由：p1とp2は並行で動く。wait1のほうが早く終わるので、まずp2がreject(errY)。await p1がまだ待ち中→await p1; await p2;の順に実行されるため、最初にp1が評価されるが、その後await p2に進んだ時点でerrYがthrowされる。1つ目のエラーだけcatchに渡り、両方の例外を同時には捕まえられない。

## 結果

file:///C:/Users/r23600307/Desktop/exercises-public/exercises/ch13/ex07/index.js:10
    log(e.message);
    ^

ReferenceError: log is not defined
    at h1 (file:///C:/Users/r23600307/Desktop/exercises-public/exercises/ch13/ex07/index.js:10:5)
    at file:///C:/Users/r23600307/Desktop/exercises-public/exercises/ch13/ex07/index.js:44:1
    at ModuleJob.run (node:internal/modules/esm/module_job:222:25)
    at async ModuleLoader.import (node:internal/modules/esm/loader:323:24)
    at async loadESM (node:internal/process/esm_loader:28:7)
    at async handleMainPromise (node:internal/modules/run_main:113:12)

Node.js v20.12.1
