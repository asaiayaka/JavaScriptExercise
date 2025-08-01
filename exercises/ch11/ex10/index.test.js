import { getDaysInMonth, countWeekdays, getDayName, getStartOfLastMonth } from './index'

describe('getDaysInMoth', () => {
    test('閏年の2月は29日', () => {
        expect(getDaysInMonth(2024, 2)).toBe(29);
    });

    test('4月は30日', () => {
        expect(getDaysInMonth(2025, 4)).toBe(30);
    });

    test('12月は31日', () => {
        expect(getDaysInMonth(2025, 12)).toBe(31);
    });
});

describe('countWeekdays', () => {
    test('週末を含まない期間(平日のみ)', () => {
        expect(countWeekdays('2025-08-04', '2025-08-08')).toBe(5); // 月〜金
    });

    test('土日を含む1週間', () => {
        expect(countWeekdays('2025-08-04', '2025-08-10')).toBe(5); // 月〜日
    });

    test('開始日と終了日が同じで平日の場合', () => {
        expect(countWeekdays('2025-08-01', '2025-08-01')).toBe(1); // 月
    });
    
    test('開始日と終了日が同じで土日の場合', () => {
        expect(countWeekdays('2025-08-02', '2025-08-02')).toBe(0); // 土
    });
});

describe('getDayName', () => {
    test('2025-08-01は金曜日（ja-JP）', () => {
        expect(getDayName('2025-08-01', 'ja-JP')).toBe('金曜日');
    });

    test('2025-08-01 is Friday（en-US）', () => {
        expect(getDayName('2025-08-01', 'en-US')).toBe('Friday');
    });

    test('2025-08-03は日曜日', () => {
        expect(getDayName('2025-08-03', 'ja-JP')).toBe('日曜日');
    });
});

describe('getStartOfLastMonth', () => {
    test('先月の1日 0:00:00が返ること', () => {
        const result = getStartOfLastMonth();
        const now = new Date();
        const expectedMonth = now.getMonth() === 0 ? 11 : now.getMonth() - 1;
        const expectedYear = now.getMonth() === 0 ? now.getFullYear() - 1 : now.getFullYear();

        expect(result.getFullYear()).toBe(expectedYear);
        expect(result.getMonth()).toBe(expectedMonth);
        expect(result.getDate()).toBe(1);
        expect(result.getHours()).toBe(0);
        expect(result.getMinutes()).toBe(0);
        expect(result.getSeconds()).toBe(0);
    });
});