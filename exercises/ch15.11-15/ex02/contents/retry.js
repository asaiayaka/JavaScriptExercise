export async function retryWithExponentialBackoff(func, maxRetry = 3, maxDelay = 8000) {
    for (let attempt = 0; attempt < maxRetry; attempt++) {
        try {
            const result = await func();
            // funcがfalseを返した場合はリトライ対象
            if (result !== true) {
                return true; // 成功したら終了
            }
        } catch (err) {
            // funcがthrowしても無視してトライ
        }

        if (attempt < maxRetry - 1) {
            // 次の待機時間(1s, 2s, 4s...)上限はmaxDelay
            const delay = Math.min(Math.pow(2, attempt) * 1000, maxDelay);
            await new Promise((resolve) => setTimeout(resolve, delay));
        }
    }
    return false; // リトライ失敗
}