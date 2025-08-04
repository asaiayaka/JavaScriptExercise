/**
 * 指定の関数funcを最大maxRetry回まで、指数バックオフで非同期にリトライ実行する
 * funcがtrueを返したら即座に成功として終了し、callback(true)を呼ぶ
 * funcがfalseを返し続ける場合は、1秒→2秒→4秒…　と2倍ずつ待ち時間を増やして再実行
 * 最終的にmaxRetry回試しても成功しない場合、callback(false)を呼ぶ
 * 
 * @param {Function} func - 成功ならtrueを返す関数(同期)
 * @param {number} maxRetry - 最大リトライ回数
 * @param {Function} callback - 実行完了時にtrue/falseを受け取るコールバック
 */
export function retryWithExponentialBackoff(func, maxRetry, callback) {
    // 非同期に処理を始めるため即座に関数に返す
    setTimeout(() => {
        let attempt = 0;

        const tryFunc = () => {
            const result = func();
            if (result === true) {
                callback(true); // 成功したらコールバックして終了
                return;
            }

            attempt++;
            if (attempt >= maxRetry) {
                callback(false); // リトライ失敗しきったら終了
                return;
            }

            // 次の試行までの待期時間(1, 2, 4,...秒)
            const delay = Math.pow(2, attempt - 1) * 1000;
            setTimeout(tryFunc, delay);
        };

        tryFunc();
    }, 0);
}