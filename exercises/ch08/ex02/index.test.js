import {powerLoop, powerRecursive} from './index'

describe('powerLoop 関数のテスト', () => {
    test('基本的なべき乗を正しく計算できるか', () => {
        expect(powerLoop(2, 0)).toBe(1); // 2^0 = 1
        expect(powerLoop(2, 3)).toBe(8); // 2^3 = 8
        expect(powerLoop(5, 4)).toBe(625); // 5^4 = 625
        expect(powerLoop(3, 5)).toBe(243); // 3^5 = 243
    });

    test('1や0の扱い', () => {
        expect(powerLoop(1, 1000)).toBe(1); // 1^n = 1
        expect(powerLoop(0, 5)).toBe(0); // 0^5 = 0
    });
});

describe('powerRecursive関数のテスト', () => {
    test('基本的なべき乗を正しく計算できるか', () => {
        expect(powerRecursive(2, 0)).toBe(1); // 1^n = 1
        expect(powerRecursive(0, 5)).toBe(0); // 0^n = 0 (n > 0)
    });
});