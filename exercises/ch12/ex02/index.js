// フィボナッチ数列のイテレータを返す関数(ジェネレータ不使用)
export function fibonacciIter() {
    // 最初の二つの値を用意
    let x = 0;
    let y = 1;

    // イテレータオブジェクトを返す
    return {
        // for-ofなどで利用可能にするためのメソッド
        [Symbol.iterator] () {
            return this;
        },

        // next()が呼ばれるたびに次のフィボナッチ数を返す
        next() {
            // 現在のyを返す
            const value = y;

            // x,yを次のペアに更新([x, y] = [y, x + y]と同じ)
            const newY = x + y;
            x = y;
            y = newY;

            return {
                value, done: false
            };
        },
        // breakされたときのcleanup用
        return() {
            return {
                value: undefined, done: true
            };
        }
    };
}