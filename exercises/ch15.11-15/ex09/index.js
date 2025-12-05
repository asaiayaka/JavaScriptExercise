const ROWS = 50;
const COLS = 50;
const RESOLUTION = 10;

const canvas = document.querySelector("#screen");
const ctx = canvas.getContext("2d");
const startButton = document.querySelector("#start");
const pauseButton = document.querySelector("#pause");

canvas.width = ROWS * RESOLUTION;
canvas.height = COLS * RESOLUTION;

const sound = new Audio("/ch15.04-10/ex10/decision1.mp3");

// 初期は空のグリッド
let grid = new Array(ROWS).fill(null).map(() => new Array(COLS).fill(false));

// 描画関数
function renderGrid(grid) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      ctx.beginPath();
      ctx.rect(col * RESOLUTION, row * RESOLUTION, RESOLUTION, RESOLUTION);
      ctx.fillStyle = grid[row][col] ? "black" : "white";
      ctx.fill();
      ctx.strokeStyle = "#ccc";
      ctx.stroke();
    }
  }
}

// クリックでセルの状態を反転(サーバーへtoggleを送る)
canvas.addEventListener("click", function (evt) {
  if (!grid) {
    return;
  }

  const rect = canvas.getBoundingClientRect();
  const pos = { x: evt.clientX - rect.left, y: evt.clientY - rect.top };
  const row = Math.floor(pos.y / RESOLUTION);
  const col = Math.floor(pos.x / RESOLUTION);
  if (row < 0 || row >= ROWS || col < 0 || col >= COLS) return;

  try {
    sound.cloneNode().play();
  } catch (e) {}

  if (ws && ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify({ type: "toggle", row, col }));
  }

  grid[row][col] = !grid[row][col];
  renderGrid(grid);
});

// Start / Pause ボタン
startButton.addEventListener("click", () => {
  if (ws && ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify({ type: "start" }));
  }
});

pauseButton.addEventListener("click", () => {
  if (ws && ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify({ type: "pause" }));
  }
});

// WebSocket 接続
let ws = null;

function setButtonsRunning(running) {
  startButton.disabled = running;
  pauseButton.disabled = !running;
}

function connect() {
  ws = new WebSocket("ws://localhost:3003");

  ws.addEventListener("open", () => {
    console.log("WebSocket connected");
    startButton.disabled = true;
    pauseButton.disabled = true;
  });

  ws.addEventListener("message", (ev) => {
    let data;
    try {
      data = JSON.parse(ev.data);
    } catch (e) {
      console.warn("不能なメッセージ", ev.data);
      return;
    }

    switch (data.type) {
      case "update":
        if (Array.isArray(data.grid)) {
          grid = data.grid;
          renderGrid(grid);
        }
        break;

      case "start":
        setButtonsRunning(true);
        break;

      case "pause":
        setButtonsRunning(false);
        break;
    }
  });

  ws.addEventListener("close", () => {
    console.log("WebSocket closed. Reconnecting...");
    startButton.disabled = true;
    pauseButton.disabled = true;
    setTimeout(connect, 1000);
  });
}

renderGrid(grid);
connect();
