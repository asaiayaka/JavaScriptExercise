// ========================================
// 手動実装のイテレータ
// ========================================
// JavaScript のイテレータプロトコルに従って、
// next() / return() / throw() を手動で実装する。
function counterIter(max) {
    console.log("counterIter"); // イテレータオブジェクト生成時に一度だけ呼ばれる
    let c = 1; // カウンタの初期値

    return {
        // for-of ループやスプレッド演算子で最初に呼ばれるメソッド
        [Symbol.iterator]() {
            console.log("counterIter: Symbol.iterator");
            return this; // 自分自身がイテレータであることを返す
        },

        // 値を 1 つずつ返すメソッド
        next() {
            console.log("counterIter: next");
            if (c > max) {
                // 最大値を超えたらイテレーション終了
                return { value: undefined, done: true };
            }
            const value = c;
            c++;
            return { value, done: false };
        },

        // イテレーションを強制的に終了するメソッド
        // for-of の break や return() 呼び出し時に必ず呼ばれる
        return(value) {
            console.log("counterIter: return:", value);
            return { value, done: true };
        },

        // 外部から throw() を呼び出した場合に実行される
        throw(e) {
            console.log("counterIter: throw:", e);
            throw e; // 呼び出し元に例外を再スロー
        },
    };
}

// ========================================
// ジェネレータ実装
// ========================================
// function* で定義された関数は、自動的にイテレータを返す。
// 手動実装と違って next/return/throw は自動的にサポートされる。
function* counterGen(max) {
    console.log("counterGen"); // 初回 next() 呼び出し時に実行される

    try {
        for (let c = 1; c <= max; c++) {
            console.log("counterGen: next"); // 値を yield する直前に実行される
            yield c; // 呼び出し元に値を返す
        }
    } finally {
        // return() や break、例外発生時など「どんな終了経路でも必ず」実行される
        console.log("counterGen: finally");
    }
}

// ========================================
// テスト関数群
// ========================================

// 明示的に next(), return(), throw() を呼び出して挙動確認
function testIterator(it) {
    console.log("=== 明示的 next() 呼び出し ===");
    console.log(it.next()); // { value: 1, done: false }
    console.log(it.next()); // { value: 2, done: false }

    console.log("=== 明示的 return() 呼び出し ===");
    console.log(it.return("RETURN")); // { value: "RETURN", done: true }

    console.log("=== 明示的 throw() 呼び出し ===");
    try {
        // return() 済みのイテレータでも throw() を呼び出せる
        console.log(it.throw("ERROR"));
    } catch (e) {
        console.log("catch in testIterator:", e);
    }

    console.log("=== for-of ===");
    // return() 済みなのでループは即終了し、何も出力されない
    for (const v of it) {
        console.log("for-of:", v);
    }
}

// for-of を途中で break したときの挙動を確認
function testForOfWithBreak(makeIter) {
    console.log("=== for-of 途中で break ===");
    for (const v of makeIter()) {
        console.log("for-of:", v);
        if (v === 2) {
            // break した時点で return() が呼ばれる
            break;
        }
    }
}

// for-of 内で例外を投げたときの挙動を確認
function testForOfWithThrow(makeIter) {
    console.log("=== for-of 中に例外発生 ===");
    try {
        for (const v of makeIter()) {
            console.log("for-of:", v);
            if (v === 2) {
                // 例外を発生させると return() が呼ばれたあと throw によって抜ける
                throw new Error("BOOM!");
            }
        }
    } catch (e) {
        console.log("catch in testForOfWithThrow:", e.message);
    }
}

// ========================================
// 実行部分
// ========================================
console.log("===== counterIter =====");
testIterator(counterIter(3));
testForOfWithBreak(() => counterIter(3));
testForOfWithThrow(() => counterIter(3));

console.log("\n===== counterGen =====");
testIterator(counterGen(3));
testForOfWithBreak(() => counterGen(3));
testForOfWithThrow(() => counterGen(3));
