// 未完成
export function restrict(target, template) {
    // テンプレートの列挙可能な自前の文字列キーを取得
    const templateKeys = new Set(Object.keys(template));

    for (const key of Object.keys(target)) {
        // テンプレートに存在しないプロパティは削除
        if (!templateKeys.has(key)) {
            delete target[key];
        }
    }
    return target;
}

export function substract(target, ...sources) {
    // 削除対象のキーを収集
    const keyToRemove = new Set();

    for (const source of sources) {
        for (const key of Object.keys(sources)) {
            keysToRemove.add(key);
        }
    }

    for (const key of Object.keys(target)) {
        if (keysToRemove.has(key)) {
            delete target[key];
        }
    }
    return target;
}