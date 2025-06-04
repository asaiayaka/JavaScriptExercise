// 行列の加算
export function addMatrix(A, B) {
    // 行数のチェック
    if (A.length !== B.length) {
        throw new Error('行数が一致しません');
    }

    const result = [];
    for (let i = 0; i < A.length; i++) {
        // 各行の列数が同じかチェック
        if (A[i].length !== B[i].length) {
            throw new Error('列数が一致しません');
        }
    

        result[i] = [];
        for (let j = 0; j < A[i].length; j++) {
            result[i][j] = A[i][j] + B[i][j];
        }
    }
    return result;
}

// 行列の乗算を行う
export function multiplyMatrix(A, B) {
    if (A.length === 0 || B.length === 0) {
        throw new Error('空の行列は処理できません');
    }

    const aCols = A[0].length; // Aの列数
    const bRows = B.length; // Bの行数

    // 行列Aの全行が同じ列数であるかのチェック
    for (let row of A) {
        if (row.length !== aCols) {
            throw new Error('行列Aの各行の長さが一致しません');
        }
    }

    // 行列Bの全行が同じ列数であるかのチェック
    const bCols = B[0].length;
    for (let row of B) {
        if (row.length !== bCols) {
            throw new Error('行列Bの各行の長さが一致しません');
        }
    }

    // 乗算が可能かチェック：Aの列数とBの行数が一致する必要がある
    if (aCols !== bRows) {
        throw new Error('行列Bの各行の長さが一致しません');
    }

    // 結果の行列を初期化(m * p のゼロ行列)
    const result = [];
    for (let i = 0; i < A.length; i++) {
        result[i] = [];
        for (let j = 0; j < bCols; j++) {
            result[i][j] = 0;
        }
    }

    // 行列乗算の計算
    for (let i = 0; i < A.length; i++) {
        for (let j = 0; j < bCols; j++) {
            for (let k = 0; k < aCols; k++) {
                result[i][j] += A[i][k] * B[k][j];
            }
        }
    }
    return result;
}