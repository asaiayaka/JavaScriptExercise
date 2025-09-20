// 任意のオブジェクトのメソッド呼び出しを監視して履歴を残す
// 履歴は呼び出し時刻、メソッド名、引数を記録する
export function createMethodLogger(target) {
    if (typeof target !== "object" || target === null) {
        throw new Error("オブジェクトを渡してください");
    }

    // メソッド呼び出し履歴を格納する配列
    const history = [];

    // Proxyハンドラ
    const handler = {
        get(obj, prop) {
            const original = obj[prop];

            // メソッドの場合だけ呼び出しをラップして履歴を追加
            if (typeof original === "function") {
                return function (...args) {
                    history.push({
                        timestamp: new Date(), // 呼び出し時刻
                        method: prop, // メソッド名
                        args, // 引数
                    });
                    return original.apply(this, args); // 元のメソッドを実行
                };
            }

            // メソッド以外はそのまま返す
            return original;
        },
    };

    const proxy = new Proxy(target, handler);

    // Proxyと履歴配列を返す
    return { proxy, history };
}