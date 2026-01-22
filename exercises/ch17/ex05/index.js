import { updateGrid } from "./grid.js";
import { renderGrid } from "./render.js";

// 定数定義
const ROWS = 50;
const COLS = 50;
const RESOLUTION = 10;
const FPS = 10;

// DOM取得
const canvas = document.querySelector("#screen");
const ctx = canvas.getContext("2d");
canvas.width = COLS * RESOLUTION;
canvas.height = ROWS * RESOLUTION;

// 初期グリッド(ランダム)
let grid = Array.from({ length: ROWS }, () => 
    Array.from({ length: COLS }, () => Math.random() < 0.5)
);

// アニメーション制御
let animationId = null;
let lastTime = 0;
const interval = 1000 / FPS;

function loop(time = 0) {
    animationId = requestAnimationFrame(loop);
    if (time - lastTime > interval) {
        lastTime = time;
        grid = updateGrid(grid, ROWS, COLS);
        renderGrid(ctx, grid, ROWS, COLS, RESOLUTION);
    }
} 

// ボタン操作
document.querySelector("#start").onclick = () => {
    if (!animationId) {
        loop();
    }
};

document.querySelector("#pause").onclick = () => {
    cancelAnimationFrame(animationId);
    animationId = null;
};

renderGrid(ctx, grid, ROWS, COLS, RESOLUTION);