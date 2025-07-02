// withResource関数を定義
export function withResource(resource, callback) {
    try {
        // コールバックを実行
        return callback(resource);
    } finally {
        // コールバック関数が正常終了しても例外が起きても、必ずcloseを呼ぶ
        resource.close();
    }
}