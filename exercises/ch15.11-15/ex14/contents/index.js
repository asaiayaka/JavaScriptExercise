"use strict";

const button = document.querySelector("#send-button");
const messageContainer = document.getElementById("message-container");
button.addEventListener("click", (e) => {
  e.preventDefault();
  getMessageFromServer();
});
async function getMessageFromServer() {
  const messageElement = document.createElement("div");
  messageElement.className = "message";
  messageElement.textContent = "";
  messageContainer.appendChild(messageElement);

  // TODO: ここにサーバーとのやり取り等を実装しなさい
  // サーバーからの SSE（EventSource）メッセージ受信処理
  // 通信ボタンを無効化する(連打防止)
  button.disabled = true;

  // EventSourceでサーバーと接続する
  const eventSource = new EventSource("http://localhost:3000/message");

  // サーバーからメッセージ(data:)を受信したときの処理
  eventSource.onmessage = (event) => {
    // event.dataはJSON形式の文字列なのでパースする
    const obj = JSON.parse(event.data);

    // obj.valueをメッセージとして追記する
    messageElement.textContent += obj.value;

    // doneがtrueなら通信終了→EventSourceを閉じる
    if (obj.done) {
      eventSource.close();

      // ボタンを再度押せるようになる
      button.disabled = false;
    }
  };

  // エラーが発生した場合
  eventSource.onerror = () => {
    messageElement.textContent += "\n[エラーが発生しました]";
    eventSource.close();
    button.disabled = false;
  };
}
