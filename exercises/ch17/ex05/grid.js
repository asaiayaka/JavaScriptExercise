// ライフゲームの世代更新ロジック
export function updateGrid(grid, rows, cols) {
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