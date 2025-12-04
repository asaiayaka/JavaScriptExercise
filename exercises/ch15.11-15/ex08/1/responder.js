import WebSocket from "ws";

const wsResponder = new WebSocket("ws://localhost:3003");

wsResponder.on("message", (event) => {
    try {
        const msg = JSON.parse(event.toString());
        const { id, request } = msg;

        const responseMsg = JSON.stringify({
            id,
            response: `Hello, ${request}`,
        });

        wsResponder.send(responseMsg);
    } catch (e) {
        console.error("Invalid message", e);
    }
});