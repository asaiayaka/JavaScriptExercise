# 解答

## 結果

  InstrumentedLinkedList
    √ #push (5 ms)                                                          
    × #pushAll (2 ms)                                                       
                                                                            
  ● InstrumentedLinkedList › #pushAll                                       
                                                                            
    expect(received).toBe(expected) // Object.is equality

    Expected: 2
    Received: 4

      10 |     const list = new InstrumentedLinkedList();
      11 |     list.pushAll("A", "B");
    > 12 |     expect(list.pushCount).toBe(2);
         |                            ^
      13 |   });
      14 | });
      15 |

      at Object.toBe (ch09/ex07/index.test.js:12:28)

Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 passed, 2 total
Snapshots:   0 total
Time:        0.631 s

## 問題点

InstrumentedLinkedList は LinkedList を継承して push() をオーバーライドし、pushCount を記録しています。

しかし、pushAll() も親クラスの push() を使っているため、オーバーライドした InstrumentedLinkedList.push() が呼ばれるはずだが、実際にはLinkedList.push() が直接呼ばれるという挙動が起きているのが問題です。

## なぜpushCountが正しくカウントされないのか

JavaScript の private フィールド（#head, #tail）は完全にプライベートで、継承元・サブクラスからも共有されません。

LinkedList.pushAll() が this.push() を呼ぶとき、もしそれが super.pushAll() 経由なら、親クラス内で定義された push()（= LinkedList.push()）が呼ばれます。

このため、InstrumentedLinkedList.pushCount++ は呼び出されず、pushCount が正しく加算されないのです。
