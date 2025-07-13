export class TypedMap {
    constructor(keyType, valueType, entries = []) {
        this.keyType = keyType;
        this.valueType = valueType;
        this._map = new Map();

        // 初期エントリに対して型チェックを行い、内部のMapに追加
        for (let [k, v] of entries) {
            if (typeof k !== keyType || typeof v !== valueType) {
                throw new TypeError(`Wrong type for entry [${k}, ${v}]`);
            }
            this._map.set(k, v);
        }
    }

    // 値を追加するメソッド。型チェックをしてから内部Mapに委譲
    set(key, value) {
        if (typeof key !== this.keyType) {
            throw new TypeError(`${key} is not of type ${this.keyType}`);
        }
        if (typeof value !== this.valueType) {
            throw new TypeError(`${value} is not of type ${this.valueType}`);
        }
        this._map.set(key, value);
        return this;
    }

    // 値を取得するメソッド。内部Mapにそのまま委譲
    get(key) {
        return this._map.get(key);
    }

    // キーが存在するかどうかの確認。委譲
    has(key) {
        return this._map.has(key);
    }

    // 要素数を取得。委譲
    get size() {
        return this._map.size;
    }

    // 要素の削除。委譲
    delete(key) {
        return this._map.delete(key);
    }

    // 全削除。委譲
    clear() {
        return this._map.clear();
    }

    // イテレータなども必要に応じて委譲できる
    entries() {
        return this._map.entries();
    }

    [Symbol.iterator] () {
        return this._map[Symbol.iterator]();
    }
}