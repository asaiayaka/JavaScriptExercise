function fizzbuzz(n) {
    Array.from({length: n}, (_, i) => i + 1).forEach(i =>  // Array.fromは指定した形式から新しい配列を作るメソッド、length: nは長さnの空配列を作る材料、(_,i)=>i+1はインデックスiに1を足して配列要素にする関数、_は使わない引数中身はundefinedなのでアンダースコアで無視しているだけ
        console.log(
            [i % 3 === 0 ? 'Fizz' : '', i % 5 === 0 ? 'Buzz' : ''].join('') || i
        )
    );
}

// fとgの各要素の差を二乗して全部足す
function sumOfSquareDifference(f, g) {
    return f.reduce((sum, val, i) => sum + (val - g[i]) ** 2, 0); // reduceはfの各要素に対して処理をし、1つの値(合計)に畳み込む。(sum, val, i):val:f[i]の値、i:インデックスなのでg[i]を取得できる、(val - g[i])**2: f[i]とg[i]野さを二乗、0は初期値
}

function sumOfEvensIsLargerThan42(array) {
    return array
        .filter(x => x % 2 === 0) // 偶数だけ抽出
        .reduce((sum, x) => sum + x, 0) >= 42; // 偶数の合計値を出し、42以上かどうか返す
}