import {repeatChar, square, getNow} from './index'

describe('repeatChar 関数のテスト', () => {
    test('cをn回コンソール出力し、cをn個含む配列を返す', () => {
        const n = 3;
        const c = 'A';

        // console.logの出力を監視する
        console.log() = jest.fn(); // console.logをモック関数に置き換える

        const result = repeatChar(n, c);

        // console.logがn回呼ばれたか確認
        expect(console.log).toHaveBeenCalledTimes(n);

        // すべての呼び出しが'A'か確認
        expect(console.log).toHaveBeenCalledWith(c);

        // 返り値が['A', 'A', 'A']であることを確認
        expect(result).toEqual(['A', 'A', 'A']);
    });
});

describe('square 関数のテスト', () => {
    test('数値xを2乗して返す', () => {
        expect(square(2)).toBe(4); // 2の2乗 = 4
        expect(square(-3)).toBe(9); // -3の2乗 = 9
        expect(square(0)).toBe(0); // 0の2乗 = 0
    });
});

describe('getNow 関数のテスト', () => {
    test('現在時刻のプロパティnowを含むオブジェクトを返す', () => {
        const result = getNow();

        // resultがオブジェクトで、プロパティnowが存在することを確認
        expect(result).toHaveProperty('now');

        // nowの中身がDateオブジェクトであることを確認
        expect(result.now instanceof Date).toBe(true);
    });
});