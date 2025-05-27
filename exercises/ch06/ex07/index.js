/**
 * Object.assignと同等の動作をする関数
 * 
 * @param {Object} target - コピー先となるターゲットオブジェクト(null/undefined不可)
 * @param {...any} sources - コピー元の1つ以上のソース(プリミティブも可)
 * @param {Object} - プロパティがコピーされたターゲットオブジェクト
 * @throws {TypeError} - targetがnullまたはundefinedの場合
 */

export function assign(target, ...sources) {
    // ターゲットがnullまたはundefinedの場合はTypeErrorを投げる（Object.assignの仕様）
    if (target == null) {
        throw new TypeError("Cannot convert undefined or null to object");
    }

    // プリミティブ値だった場合もオブジェクトにラップ（例えば、true →　Boolean, 1→Number）
    const to = Object(target);

    for (const source of sources) {
        // ソースがnullまたはundefinedの場合は無限
        if (source == null) {
            continue;
        }

        // ソースがプリミティブ型の場合でもObject(source)で変換してから処理する
        const from = Object(source);

        // 自身のenumerableなSymbol keyのみをコピー
        for (const key of Object.keys(from)) {
            to[key] = from[key];
        }

        // 自身のenumerableな文字列キーのプロパティをコピー
        const symbols = Object.getOwnPropertySymbols(from);
        for (const sym of symbols) {
            const descriptor = Object.getOwnPropertyDescriptor(from, sym);
            // enumerableなsymbolプロパティのみをコピー
            if (descriptor && descriptor.enumerable) {
                to[sym] = from[sym];
            }
        }
    }

    // 結果として変更されたターゲットオブジェクトを返す
    return to;
}