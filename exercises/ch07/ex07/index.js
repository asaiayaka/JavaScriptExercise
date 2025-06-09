// compare関数は2つの要素の大小を比較する(デフォルトは昇順)
export function quickSort(array, compare = (a, b) => (a < b ? -1 : a > b ? 1 : 0)) { // a<bなら-1, a>bなら1、それ以外なら0
    // 配列の長さが1以下ならそのまま返す(すでにソート済み)
    if (array.length <= 1) {
        return array;
    }

    // ピボット(基準値)を先頭の要素とする
    const pivot = array[0];

    // ピボットより小さい値を格納する配列
    const left = [];

    // ピボット以上の値を格納する配列
    const right = [];

    // 配列の2番目の要素から走査を開始
    for (let i = 1; i < array.length; i++) {
        // compare関数の結果が負なら「array[i] < pivot」
        if (compare(array[i], pivot) < 0) {
            left.push(array[i]); // 小さいのでleftに入れる
        } else {
            right.push(array[i]); // 大きいまたは等しいので、rightに入れる
        }
    }

    // leftとrightにそれぞれ再帰的にソートして、結合して返す
    return [...quickSort(left, compare), pivot, ...quickSort(right, compare)];
}