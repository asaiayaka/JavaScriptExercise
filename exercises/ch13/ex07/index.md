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

=== h1 ===
A
B
C
=== h2 ===
=== h3 ===
=== h4 ===
X error
file:///C:/Users/r23600307/Desktop/exercises-public/exercises/ch13/ex07/index.js:16
function errX() { throw new Error("X error"); }
                        ^

Error: X error
    at errX (file:///C:/Users/r23600307/Desktop/exercises-public/exercises/ch13/ex07/index.js:16:25)
    at file:///C:/Users/r23600307/Desktop/exercises-public/exercises/ch13/ex07/index.js:44:5
    at new Promise (<anonymous>)
    at h3 (file:///C:/Users/r23600307/Desktop/exercises-public/exercises/ch13/ex07/index.js:43:3)
    at file:///C:/Users/r23600307/Desktop/exercises-public/exercises/ch13/ex07/index.js:73:3

Node.js v20.12.1

## 結果の理由

- h2
  - new Promise(executor)のexecutor内でthrowがあれば、自動的にそのPromiseがreject状態になる
  - そのrejectを後続の.catchが確実に拾えるので、log(e.message)が呼ばれ"X error"と出る
