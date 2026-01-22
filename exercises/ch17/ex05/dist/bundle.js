/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./grid.js"
/*!*****************!*\
  !*** ./grid.js ***!
  \*****************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   updateGrid: () => (/* binding */ updateGrid)
/* harmony export */ });
// ライフゲームの世代更新ロジック
function updateGrid(grid, rows, cols) {
    // 元の配列をコピー
    const next = grid.map(r => [...r]);

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            let count = 0;

            // 8近傍をチェック
            for (let dr = -1; dr <= 1; dr++) {
                for (let dc = -1; dc <= 1; dc++) {
                    if (dr === 0 && dc === 0) {
                        continue;
                    }

                    const nr = r + dr;
                    const nc = c + dc;

                    if (nr >= 0 &&
                        nr < rows &&
                        nc >= 0 &&
                        nc < cols &&
                        grid[nr][nc]
                    ) {
                        count++;
                    }
                }
            }
            // ライフゲームのルール
            next[r][c] = grid[r][c] ? count === 2 || count === 3 : count === 3;
        }
    }
    return next;
}

/***/ },

/***/ "./render.js"
/*!*******************!*\
  !*** ./render.js ***!
  \*******************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   renderGrid: () => (/* binding */ renderGrid)
/* harmony export */ });
// Canvas描画
function renderGrid(ctx, grid, rows, cols, resolution) {
    ctx.clearRect(0, 0, cols * resolution, rows * resolution);

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            ctx.beginPath();
            ctx.rect(
                c * resolution,
                r * resolution,
                resolution,
                resolution
            );
            ctx.fillStyle = grid[r][c] ? "black" : "white";
            ctx.fill();
            ctx.strokeStyle = "#ccc";
            ctx.stroke();
        }
    }
}

/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Check if module exists (development only)
/******/ 		if (__webpack_modules__[moduleId] === undefined) {
/******/ 			var e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!******************!*\
  !*** ./index.js ***!
  \******************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _grid_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./grid.js */ "./grid.js");
/* harmony import */ var _render_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./render.js */ "./render.js");



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
        grid = (0,_grid_js__WEBPACK_IMPORTED_MODULE_0__.updateGrid)(grid, ROWS, COLS);
        (0,_render_js__WEBPACK_IMPORTED_MODULE_1__.renderGrid)(ctx, grid, ROWS, COLS, RESOLUTION);
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

(0,_render_js__WEBPACK_IMPORTED_MODULE_1__.renderGrid)(ctx, grid, ROWS, COLS, RESOLUTION);
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map