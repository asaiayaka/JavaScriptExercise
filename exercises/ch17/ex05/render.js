// Canvas描画
export function renderGrid(ctx, grid, rows, cols, resolution) {
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