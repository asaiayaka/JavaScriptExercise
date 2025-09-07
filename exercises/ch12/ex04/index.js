// iterable から条件 predicate を満たす値だけを返すイテレータを生成
function filter(iterable, predicate) {
    let iterator = iterable[Symbol.iterator]();
    return {
        [Symbol.iterator]() {
            return this;
        },
        next() {
            for (;;) {
                let v = iterator.next();
                if (v.done || predicate(v.value)) {
                    return v;
                }
            }
        },
    };
}

// 無限に整数を生成するジェネレータ
function* integers(start = 2) {
    let i = start;
    while (true) {
        yield i++;
    }
}

// 素数を順番に返す無限ジェネレータ
export function* primes() {
    let seq = integers(2); // 2から始まる無限性数列
    while (true) {
        let prime = seq.next().value; // 先頭を素数とする
        yield prime;
        // 素数primeの倍数を振るい落として次のシーケンスを作る
        seq = filter(seq, (n) => n % prime !== 0);
    }
}