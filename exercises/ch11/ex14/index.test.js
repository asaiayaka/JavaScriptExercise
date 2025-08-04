import {sortJapanese, toJapaneseDateString} from './index'

describe('sortJapanese', () => {
    test('ひらがなを濁点・小文字を無視してソート', () => {
        const input = ['がくせい', 'かくせい', 'がっこう', 'かっこう'];
        const expected = ['かくせい', 'がくせい', 'かっこう', 'がっこう']; // normalizeした順番
        expect(sortJapanese(input)),toEqual(expected);
    });

    test('小さい文字を通常文字に置き換えて比較', () => {
        const input = ['つづく', 'っづく', 'づつく'];
        const expected = ['っづく', 'つづく', 'づつく']; // normalize後: つつく
        expect(sortJapanese(input)).toEqual(expected);
    });
});

describe('toJapaneseDateString', () => {
    test('令和の例', () => {
        const date = new Date(2025,7,4); // 2025年8月4日(月は0始まりだから)
        expect(toJapaneseDateString(date)).toBe('令和7年8月4日');
    });

    test('平成の例', () => {
        const date = new Date(1990,0,1); // 1990年1月1日
        expect(toJapaneseDateString(date)).toBe('平成1年1月1日');
    });

    test('昭和の例', () => {
        const date = new Date(1980,10,20); // 1980年11月20日
        expect(toJapaneseDateString(date)).toBe('昭和55年11月20日');
    });

    test('サポート外の日付', () => {
        const date = new Date(1900,0,1);
        expect(toJapaneseDateString(date)).toBe('対応していない日付です');
    });
});