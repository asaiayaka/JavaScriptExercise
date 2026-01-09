import net from "net";

const sockets = [];
let count = 0;

function connect() {
    const socket = net.connect(8000, "localhost");

    socket.on("connect", () => {
        count++;
        sockets.push(socket);
        console.log("connected:", count);
        connect(); // 次の接続を作る
    });

    socket.on("error", (err) => {
        console.error("failed at: ", count + 1, err.message);
    });
}

connect();