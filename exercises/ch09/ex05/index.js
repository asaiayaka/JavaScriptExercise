export function instanceOf(object, constructor) {
    // null や undefined は false
    if (object == null) return false;

    // プリミティブ型（object 以外）は false
    if (typeof object !== "object" && typeof object !== "function") {
        return false;
    }

    // constructor が関数でない場合は false
    if (typeof constructor !== "function") {
        return false;
    }

    // プロトタイプチェーンをたどる
    let proto = Object.getPrototypeOf(object);
    while (proto != null) {
        if (proto === constructor.prototype) {
            return true;
        }
        proto = Object.getPrototypeOf(proto);
    }

    return false;
}
