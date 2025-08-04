// 大文字や小文字や濁点などを無視して比較するための正規化関数
function normalizeJapanese(str) {
    return str
        .normal("NFD") // 濁点や半濁点を分離する(例：ば → は + ")
        .replace(/[\u3099\u309A]/g, '') // 濁点" ・半濁点°を除去
        .replace(/っ/g, 'つ') // 小さい「っ」を通常の「つ」に置き換え
        .replace(/ゃ/g, 'や').replace(/ゅ/g, 'ゆ').replace(/ょ/g, 'よ') // 小文字のやゆよ → 通常形
        .replace(/ぁ/g, 'あ').replace(/ぃ/g, 'い').replace(/ぅ/g, 'う').replace(/ぇ/g, 'え').replace(/ぉ/g, 'お') // 小文字の母音も変換
}

// ソート関数
export function sortJapanese(arr) {
    return arr.slice().sort((a, b) => {
        const na = normalizeJapanese(a);
        const nb = normalizeJapanese(b);
        return na.localCompare(nb, 'ja'); // 日本語ロケールで比較
    });
}

export function toJapaneseDateString(date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // 月は0から始まるので+1
    const day = date.getDate();

    let era = '';
    let eraYear = 0;

    if (year >= 2019) {
        era = '令和';
        eraYear = year - 2018;
    } else if (year >= 1989) {
        era = '平成';
        eraYear = year - 1988;
    } else if (year >= 1926) {
        era = '昭和';
        eraYear = year - 1925;
    } else {
        // 明治・大正などは除外する
        return '対応していない日付けです';
    }

    return `${era}${eraYear}年${month}月${day}日`;
}