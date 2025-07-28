import {littleToBigEndian, bigToLittleEndian} from './index';

describe('エンディアン変換関数のテスト', () => {
    test('littleToBigEndian: リトルエンディアンをビッグエンディアン', () => {
        const input = new Uint32Array([0x12345678]);
        const output = littleToBigEndian(input);
        expect(output[0]).toBe(0x78563412); // バイト順を逆にした結果
    });

    test('bigToLittleEndian: ビッグエンディアンをリトルエンディアンに変換', () => {
        const input = new Uint32Array([0x78563412]);
        const output = bigToLittleEndian(input);
        expect(output[0]).toBe(0x12345678); // バイト順を逆にした結果
    });

    test('複数要素の変換も正しく行われるか', () => {
        const input = new Uint32Array([0x11223344, 0xaabbccdd]);
        const output = littleToBigEndian(input);
        expect(output[0]).toBe(0x44332211);
        expect(output[1]).toBe(0xddccbbaa);
    });
    test('変換の往復でもとに戻るか', () => {
        const original = new Uint32Array([0xdeadbeef, 0x01020304]);
        const converted = littleToBigEndian(original);
        const roundTrip = bigToLittleEndian(converted);
        expect(roundTrip[0]).toBe(original[0]);
        expect(roundTrip[1]).toBe(original[1]);
    })
})