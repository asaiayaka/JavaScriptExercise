import { quickSort } from ".";

describe('quickSort', () => {
    test('昇順でソートされる', () => {
        const input = [5, 3, 8, 1, 2];
        const result = quickSort(input);
        expect(result).toEqual([1, 2, 3, 5, 8]);
    });

    test('既にソートされた配列も問題なく動作する', () => {
        const input = [1, 2, 3, 4];
        const result = quickSort(input);
        expect(result).toEqual([1, 2, 3, 4]);
    });

    test('逆順の配列も正しくソートされる', () => {
        const input = [9, 7, 5, 3, 1];
        const result = quickSort(input);
        expect(result).toEqual([1, 3, 5, 7, 9]);
    });
    
    test('同じ要素を含む配列', () => {
        const input = [2, 3, 2, 1, 3];
        const result = quickSort(input);
        expect(result).toEqual([1, 2, 2, 3, 3]);
    });

    test('空の配列はそのまま返す', () => {
        const input = [];
        const result = quickSort(input);
        expect(result).toEqual([]);
    });

    test('1要素だけの配列はそのまま返す', () => {
        const input = [42];
        const result = quickSort(input);
        expect(result).toEqual([42]);
    });

    test('降順に並べるカスタム比較関数', () => {
        const input = [1, 4, 2, 5];
        const compareDesc = (a, b) => b - a;
        const result = quickSort(input, compareDesc);
        expect(result).toEqual([5, 4, 2, 1]);
    });
});