import { lfToCrlf, crlfToLf } from './index.js';

describe('newline conversion', () => {
    // LFをCRLFに正しく変換できているか
    test('LF to CRLF', () => {
        const input = 'line1\nline2\nline3'; // 改行がLF
        const expected = 'line1\r\nline2\r\nline3'; // 変換後
        expect(lfToCrlf(input)).toBe(expected);
    })

    // CRLFをLFに正しく変換できているか
    test('CRLF to LF', () => {
        const input = 'line1\r\nline2\r\nline3'; // 改行がCRLF
        const expected = 'line1\nline2\nline3'; // 変換後
        expect(crlfToLf(input)).toBe(expected);
    })

    // すでにCRLFが含まれているとき、LFをCRLFに変換しても\rが重複しないか
    test('LF to CRLF should not double convert', () => {
        const input = 'line1\r\nline2\nline3'; // 2行目だけLF
        const expected = 'line1\r\nline2\r\nline3'; // 変換後
        expect(lfToCrlf(input)).toBe(expected);
    })
})