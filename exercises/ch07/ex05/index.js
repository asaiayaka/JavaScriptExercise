// 非破壊的 pop
export function pop(array) {
    return array.slice(0, -1); // 最初から最後の一つ手前までを新しい配列として返す。sliceは元の配列を変更しない。
}

// 非破壊的 push
export function push(array, value) {
    return [...array, value]; // ...arrayで配列をコピーし、新しい値を末尾に追加。元の配列を壊さない。
}

// 非破壊的 shift
export function shift(array) {
    return array.slice(1); // 2番目(インデックス1)から最後までを取得。元の配列は壊さず、先頭の要素を取り除いた配列を返す。
}

// 非破壊的 unshift
export function unshift(array, value) {
    return [value, ...array]; // 新しい値を先頭に置き、元の配列を展開して新しい配列を作成。元の配列は変更されない。
}

// 非破壊的 sort
export function sort(array, compareFn) {
    return [...array].sort(compareFn); // ...array：元の配列をコピー、sort(compareFn)：コピーした配列を並び替える。compareFn：比較関数
}