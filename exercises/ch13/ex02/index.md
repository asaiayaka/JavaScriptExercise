# 解答

## f3

- 出力:
C
A
（B は出力されない）

- 理由:
then のコールバック内で発生した例外（errX）は try/catch では捕まえられない。finally ブロックは同期的に実行されるため C が出力され、非同期処理の logA はその後に実行される。

## f4

- 出力:
A
B
100

- 理由:
wait2 が解決後 logA を出力し、次の then で wait1 後に logB を出力。その後の値 100 が次の then で log される。

## f5

- 出力:
A
B
undefined

- 理由:
2つ目の then に渡したのは Promise の結果で、関数ではないため、then は即座に解決される。結果として最後の then に渡る値は undefined。

## f6

- 出力:
A
A
B
C

- 理由:
同じ Promise に対して then を複数回呼ぶと、それぞれ独立してコールバックが実行される。順序は then を呼んだ順に従う。

## f7

- 出力:
A
B
C

- 理由:
p は既に解決済みの Promise なので、後から呼ばれた then も即座に実行される。wait2 後に p.then(logB) が呼ばれ、その後 logC。

## f8

- 出力:
X
A

- 理由:
errX により Promise が拒否され、連鎖した then 内の errY はスキップされ catch に到達。catch で e.message を出力し、finally で A が出力される。

## f9

- 出力:
Y
A

- 理由:
then で errY が呼ばれ例外が発生、catch で e.message を出力し finally で A が出力される。

## f10

- 出力:
A

- 理由:
then(r, c) の c は拒否時に呼ばれるコールバック。errY の例外が then(r, c) の第二引数で処理され、catch は使われない。finally で A が出力。

## f11

- 出力:
X

- 理由:
new Promise 内で throw した例外は catch で捕捉され、e.message が log される。

## f12

- 出力:
（何も出力されない）

- 理由:
setTimeout 内で throw した場合、Promise 内の catch では捕捉できない。非同期コールバックは別のスタックで実行されるため、例外は未処理。
