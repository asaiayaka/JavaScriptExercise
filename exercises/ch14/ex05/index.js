/**
 * テンプレートリテラルタグ関数
 * 補間値の代わりにtypeofの結果（型名）を展開して文字列を返す
 */
export function typeNameTag(strings, ...values) {
    // strings: テンプレートの文字列部分の配列
    // values: 補間値の配列
    let result = "";

    // Stringsとvaluesは交互に結合されるのでループ
    for (let i = 0; i < strings.length; i++) {
        result += strings[i]; // 文字列部分を追加
        if (i < values.length) {
            const val = values[i];
            result += typeof val;
        }
    }
    return result;
}