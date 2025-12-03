import WebSocket from "ws";

const ws = new WebSocket("ws://localhost:3003");
const pendingRequests = new Map();

ws.on("message", (event) => {
  try {
    const msg = JSON.parse(event.toString());
    const { id, response } = msg;
    if (pendingRequests.has(id)) {
      const { resolve, timer } = pendingRequests.get(id);
      clearTimeout(timer);
      resolve(response);
      pendingRequests.delete(id);
    }
  } catch (e) {
    // JSON parse に失敗した場合は無視
    // 生の文字列が送られてくるのはサーバの転送のため
    console.log("Invalid message received (ignored)");
  }
});

function sendRequest(requestBody, timeout = 10000) {
  return new Promise((resolve, reject) => {
    if (ws.readyState !== WebSocket.OPEN) {
      reject(new Error("WebSocket not connected"));
      return;
    }

    const id = crypto.randomUUID ? crypto.randomUUID() : Date.now() + Math.random().toString(16);
    const timer = setTimeout(() => {
      pendingRequests.delete(id);
      reject(new Error("Timeout"));
    }, timeout);

    pendingRequests.set(id, { resolve, reject, timer });

    ws.send(JSON.stringify({ id, request: requestBody }));
  });
}

// 使用例
ws.on("open", async () => {
  try {
    const response = await sendRequest("World");
    console.log(response); // "Hello, Wirld"
  } catch (e) {
    console.error(e);
  }
});
