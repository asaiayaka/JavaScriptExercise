import { pop, push, shift, unshift, sort } from ".";

describe('non-destructive sort', () => {
    test('should return a new sorted array in ascending order', () => {
        const arr = [3, 1, 2];
        const result = sort(arr, (a, b) => a - b);
        expect(result).toEqual([1, 2, 3]);
        expect(arr).toEqual([3, 1, 2]); // 元の配列は変更されてないことを確認
    });

    test('should sort in descending order', () => {
        const arr = [10, 5, 7];
        const result = sort(arr, (a, b) => b - a);
        expect(result).toEqual([10, 7, 5]);
        expect(arr).toEqual([10, 5, 7]);
    });

    test('should handle an empty array', () => {
        const arr = [];
        const result = sort(arr, (a, b) => a - b);
        expect(result).toEqual([]);
        expect(arr).toEqual([]);
    });
});