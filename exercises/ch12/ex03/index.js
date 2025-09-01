export function* counterGenerator() {
    let count = 0; // カウンターの初期値
    try {
        while (true) {
            try {
                // yieldで値を返す
                const resetSignal = yield count;

                // next()で値が送られてきた場合はカウント更新
                if (resetSignal !== undefined) {
                    count = resetSignal;
                } else {
                    count++;
                }
            } catch(e) {
                if (e === 'reset') {
                    count = 0;
                    yield count; // throw直後に0を返す
                } else {
                    throw e;
                }
            }
        }
    } finally {
        console.log("ジェネレータ終了：後処理実行");
    }
}