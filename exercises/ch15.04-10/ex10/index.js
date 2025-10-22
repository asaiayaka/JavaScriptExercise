const ROWS = 50;
const COLS = 50;
const RESOLUTION = 10;

const canvas = document.querySelector("#screen");
const ctx = canvas.getContext("2d");
const startButton = document.querySelector("#start");
const pauseButton = document.querySelector("#pause");

canvas.width = ROWS * RESOLUTION;
canvas.height = COLS * RESOLUTION;

let animationId = null;
const sound = new Audio("/ch15.04-10/ex10/decision1.mp3");

// セルをランダム初期化
let grid = new Array(ROWS)
  .fill(null)
  .map(() => new Array(COLS).fill(null).map(() => !!Math.floor(Math.random() * 2)));

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

function updateGrid(grid) {
  const nextGrid = grid.map(arr => [...arr]);

  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      let liveNeighbors = 0;

      // 8近傍の生きているセルを数える
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          if (dr === 0 && dc === 0) continue; // 自分自身は無視
          const r = row + dr;
          const c = col + dc;
          if (r >= 0 && r < ROWS && c >= 0 && c < COLS && grid[r][c]) {
            liveNeighbors++;
          }
        }
      }

      // ライフゲームのルール
      if (grid[row][col]) {
        // 生きているセル
        nextGrid[row][col] = liveNeighbors === 2 || liveNeighbors === 3;
      } else {
        // 死んでいるセル
        nextGrid[row][col] = liveNeighbors === 3;
      }
    }
  }

  return nextGrid;
}

// クリックでセルの状態を反転
canvas.addEventListener("click", function(evt) {
  const rect = canvas.getBoundingClientRect();
  const pos = { x: evt.clientX - rect.left, y: evt.clientY - rect.top };
  const row = Math.floor(pos.y / RESOLUTION);
  const col = Math.floor(pos.x / RESOLUTION);
  grid[row][col] = !grid[row][col];
  sound.cloneNode().play();
  renderGrid(grid);
});

// 一定間隔で更新するための制御
let lastTime = 0;
const FPS = 10; // 1秒間に10回更新
const interval = 1000 / FPS;

function update(time = 0) {
  animationId = requestAnimationFrame(update);

  const delta = time - lastTime;
  if (delta > interval) {
    lastTime = time - (delta % interval);
    grid = updateGrid(grid);
    renderGrid(grid);
  }
}

// Start ボタン
startButton.addEventListener("click", () => {
  if (!animationId) update();
});

// Pause ボタン
pauseButton.addEventListener("click", () => {
  if (animationId) {
    cancelAnimationFrame(animationId);
    animationId = null;
  }
});

// 初期描画
renderGrid(grid);
