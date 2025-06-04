import { addMatrix, multiplyMatrix } from ".";

describe('addMatrix', () => {
    test('同じサイズの行列の加算', () => {
        const A = [
            [1, 2],
            [3, 4]
        ];
        const B = [
            [5, 6],
            [7, 8]
        ];
        const expected = [
            [6, 8],
            [10, 12]
        ];
        expect(addMatrix(A, B)).toEqual(expected);
    });

    test('行数が異なる場合はエラー', () => {
        const A = [
            [1, 2],
            [3, 4]
        ];
        const B = [
            [5, 6]
        ];
        expect(() => addMatrix(A, B)).toThrow('行数が一致しません');
    });

    test('列数が異なる場合はエラー', () => {
        const A = [
            [1, 2],
            [3, 4]
        ];
        const B = [
            [5, 6, 7],
            [8, 9, 10]
        ];
        expect(() => addMatrix(A, B)).toThrow('列数が一致しません');
    });
});

describe('multiplyMatrix', () => {
    test('適切なサイズの行列同士の乗算', () => {
        const A = [
            [1, 2, 3],
            [4, 5, 6]
        ];
        const B = [
            [7, 8],
            [9, 10],
            [11, 12]
        ];
        const expected = [
            [58, 64],
            [139, 154]
        ];
        expect(multiplyMatrix(A, B)).toEqual(expected);
    });

    test('Aの列数とBの行数が一致しない場合はエラー', () => {
        const A = [
            [1, 2],
            [3, 4]
        ]; // 2x2

        const B = [
            [5, 6, 7]
        ]; // 1x3 → 列数と行数が合わない

        expect(() => multiplyMatrix(A, B)).toThrow('行列Bの各行の長さが一致しません');
    });

    test('空の行列はエラー', () => {
        expect(() => multiplyMatrix([], [[1, 2]])).toThrow('空の行列は処理できません');
        expect(() => multiplyMatrix([[1, 2]], [])).toThrow('空の行列は処理できません');
    });
});
