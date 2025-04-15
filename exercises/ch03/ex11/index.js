const obj1 = {x: 1};
obj1.y = 2;
console.log(obj1);

const obj2 = {x:1, y:2};
console.log(obj1 === obj2); // false.参照が異なるため

function equals(o1, o2) {
    // 厳密等価ならtrue
    if (o1 === o2) {
        return true;
    }

    // どちらかがnullまたはオブジェクト以外ならfalse
    if (typeof o1 !== "object" || typeof o2 !== "object" || o1 === null || o2 === null) {
        return false;
    }

    // プロパティの数・キーの比較
    const keys1 = Object.keys(o1);
    const keys2 = Object.keys(o2);

    if (keys1.length !== keys2.length) {
        return false;
    }

    for (let key of keys1) {
        if (!keys2.includes(key)) {
            return false;
        }
        // 再帰的に値を比較
        if (!equals(o1[key], o2[key])) {
            return false;
        }
    }

    return true;
}