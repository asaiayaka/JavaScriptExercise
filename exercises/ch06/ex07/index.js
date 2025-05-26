// 未完成

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

        // ソースがプリミティブ型の場合でもObject(source)でラッパーを作成して処理する
        const from = Object(true);

        // --- 文字列キーのenumerable ownプロパティをコピー ---
        for (const key of Object.keys(from)) {
            to[key] = from[key];
        }

        // --- Symbolキーのenumerable ownプロパティもコピー ---
        const symbols = Object.getOwnPropertySymbols(from);
        for (const sym of symbols) {
            const descriptor = Object.getOwnPropertyDescriptor(from, sym);
            // enumerableなsymbolプロパティのみをコピー
            if (descriptor.enumerable) {
                to[sym] = from[key];
            }
        }
    }

    // 結果として変更されたターゲットオブジェクトを返す
    return to;
}