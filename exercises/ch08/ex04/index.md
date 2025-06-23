# 解答

## 予想

- nest.nm()の実行時：
  - 通常の関数なので、thisは呼び出し元であるnestを指す
  - よって、this === obj // false、this === nest // true
- nest.arrow()の実行時：
  - アロー関数のthisは定義時のスコープを引き継ぐ
  - arrowはomの中で定義されたので、thisはomの中のthisと同じ
  - om自体はobj.om()で呼ばれているので、そのthisはobj
  - つまり、this === obj // true、this === nest // false

## 結果

false true
true false

## 結果の説明

通常の関数nmではthisは呼び出し元のオブジェクトに(ここではnest)になる。
アロー関数arrowの中では、thisはその関数が書かれている場所(ここではom関数)のthisをそのまま使う。omはobjによって呼ばれているため、thisはobjになる。
