// sequenceToObject: 可変長引数を受け取り、奇数番のstringキー、偶数番の値を値とするオブジェクトを返す関数
export function sequenceToObject(...values) {
    // 値の数が偶数でなければエラーを投げる
    if (values.length % 2 !== 0) {
        throw new Error("引数の数は偶数でなければなりません。");
    }

    const result = {};

    // 2つずつループして、奇数番をキー、偶数番を値として扱う
    for (let i = 0; i < values.length; i += 2) {
        const key = values[i];
        const val = values[i + 1];

        // 奇数番の値がstringでなければエラー
        if (typeof key != 'string') {
            throw new Error(`キーの値は文字列でなければなりませんが、${typeof key}が渡されました。`);
        }

        result[key] = val;
    }

    return result;
}