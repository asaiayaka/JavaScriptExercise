import WebSocket from "ws";

const wsResponder = new WebSocket("ws://localhost:3003");

// WebSocket接続成功時
wsResponder.on("open", () => {
    console.log("Responder connected");
});

// サーバーから受信したメッセージを処理
wsResponder.on("message", (event) => {
    const text = event.toString();

    try {
        // JSONでなければ除外→無視される
        const msg = JSON.parse(text);

        // requestがあるもののみリクエスト
        if (!msg.id || !msg.request) {
            return;
        }
        const { id, request } = msg;

        // レスポンスJSONを生成
        const responseMsg = JSON.stringify({
            id,
            response: `Hello ${request}`,
        });

        // サーバーに返信（サーバーは他のクライアントへ転送する）
        wsResponder.send(responseMsg);

        console.log("Responded:", responseMsg);
    } catch (e) {
        // JSONでないメッセージ（サーバーの生文字列転送）は無視
    }
});