# 解答

## 予想

- i1
42
100

  - 理由
    - Promise.anyは最初に成功したPromiseの値を返す
    - wait1().then(() => 42)が先に解決し、v = 42
    - しかしほかのPromiseはキャンセルされないため、2秒後にv = 100に上書きされる
  
- i2
C
B
A
[A,B,C]
  - 理由
    - Promise.allはすべてのPromiseが解決されるのを待つ
    - それぞれのログは解決の早い順（C→B→A）
    - 戻り値はPromiseの配列に対応する["A", "B", "C"] 

- i3
LOG: errY
LOG: 42
B
LOG: 0
  - 理由
    - Promise.allは1つでもrejectすると即座に失敗
    - wait1が先に終わり、errY()によりreject→catchに入る
    - この時点ではv = 42のまま
    - ただし並行で動いていたwait2はBを出力、wait3は後からv = 0に変更

- i4
10

  - 理由
    - 元のコードは「next = v + 1 → await → v = next」の間に他方が更新してしまい、更新が失われる（競合状態）
    - 修正版では単純にv += 1をawaitの後で行うようにしたため、2つの処理で合計10回インクリメントされ、最終的に10となる
 