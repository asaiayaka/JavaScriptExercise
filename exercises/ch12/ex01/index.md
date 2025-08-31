# 解答

## 実行結果

===== counterIter =====
counterIter
=== 明示的 next() 呼び出し ===
counterIter: next
{ value: 1, done: false }
counterIter: next
{ value: 2, done: false }
=== 明示的 return() 呼び出し ===
counterIter: return: RETURN
{ value: 'RETURN', done: true }
=== 明示的 throw() 呼び出し ===
counterIter: throw: ERROR
catch in testIterator: ERROR
=== for-of ===
counterIter: Symbol.iterator
counterIter: next
for-of: 3
counterIter: next
=== for-of 途中で break ===
counterIter
counterIter: Symbol.iterator
counterIter: next
for-of: 1
counterIter: next
for-of: 2
counterIter: return: undefined
=== for-of 中に例外発生 ===
counterIter
counterIter: Symbol.iterator
counterIter: next
for-of: 1
counterIter: next
for-of: 2
counterIter: return: undefined
catch in testForOfWithThrow: BOOM!

===== counterGen =====
=== 明示的 next() 呼び出し ===
counterGen
counterGen: next
{ value: 1, done: false }
counterGen: next
{ value: 2, done: false }
=== 明示的 return() 呼び出し ===
counterGen: finally
{ value: 'RETURN', done: true }
=== 明示的 throw() 呼び出し ===
catch in testIterator: ERROR
=== for-of ===
=== for-of 途中で break ===
counterGen
counterGen: next
for-of: 1
counterGen: next
for-of: 2
counterGen: finally
=== for-of 中に例外発生 ===
counterGen
counterGen: next
for-of: 1
counterGen: next
for-of: 2
counterGen: finally
catch in testForOfWithThrow: BOOM!

## 動作の説明

- next()
  - 手動イテレータ：next()が呼ばれるたびにcounterIter: nextが出力され、値を返す
  - ジェネレータ：初回next()時に関数本体が開始し、yield前にcounterGen: nextが出力される
- return()
  - 手動イテレータ：counterIter: returnが呼ばれて即座に終了
  - ジェネレータ：finallyブロックが必ず実行され、終了処理が行われる
- throw()
  - 手動イテレータ：throw()メソッド内でログを出して再スロー
  - ジェネレータ：内部に渡された例外がcatchされ（なければ外へ）、最終的にfinallyが必ず実行される
- for-of
  - 繰り返し開始時にSymbol.iteratorが呼ばれる
  - 手動イテレータではnext()が繰り返し呼ばれ、終了時にdone: trueを返す
  - ジェネレータではyieldごとに値を返し、最後にfinallyが必ず実行される
- for-of + break
  - 手動イテレータ：breakによってreturn()が呼ばれる
  - ジェネレータ：finallyが実行される
- for-of + throw
  - 手動イテレータ：例外が発生した直後にreturn()が呼ばれ、後続処理は終了
  - ジェネレータ：例外によりグループが中断されるが、必ずfinallyが実行される
