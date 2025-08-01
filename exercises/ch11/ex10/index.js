// 特定の年と月の最大日数を取得する関数
export function getDaysInMonth(year, month) {
    return new Date(year, month, 0).getDate(); // 月末日を取得(monthは1始まり)
}

// 期間内の平日の日数をカウント
export function countWeekdays(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    let count = 0;

    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
        const day = d.getDay();
        if (day !== 0 && day !== 6) {
            count++;
        }
    }

    return count;
}

// 指定された日付とロケールに基づく曜日名の取得
export function getDayName(dateString, locale) {
    const date = new Date(dateString);
    return date.toLocaleDateString(locale, {weekday: 'long'});
}

// 先月の1日0:00:00を返す関数(getMonth/setMonth不使用)
export function getStartOfLastMonth() {
    const now = new Date();
    const thisMonthStart = new Date(now.getFullYear(), now.getDate() >= 1 ? now.getMonth() : now.getMonth() - 1, 1);
    const lastMonthEnd = new Date(thisMonthStart);
    lastMonthEnd.setDate(0); // 前月の末日

    return new Date(lastMonthEnd.getFullYear(), lastMonthEnd.getMonth(), 1, 0, 0, 0);
}