/**
 * 指数バックオフ付きリトライ関数
 * 
 * @param {Function} func - Promiseを返す非同期関数
 * @param {number} maxRetry - 最大リトライ回数
 * @returns {Promise<any>} - 成功時にfuncの返り値で、resolve、失敗時にreject
 */
export function retryWithExponentialBackoff(func, maxRetry) {
    return new Promise((resolve, reject) => {
        let attempt = 0;

        const tryFunc = async () => {
            try {
                const result = await func();
                resolve(result); // 成功したら即座にresolve
            } catch (err) {
                attempt++;
                if (attempt >= maxRetry) {
                    reject(err); // 規定回数失敗したらreject
                    return;
                }

                // 次の試行までの待ち時間(1, 2, 4, ... 秒)
                const delay = Math.pow(2, attempt - 1) * 1000;
                setTimeout(tryFunc, delay);
            }
        };
        // 最初の試行を開始
        tryFunc();
    });
}