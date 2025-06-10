function makeFixedSizeArray(size) {
    const array = new Array(size);
    return {
        get(index) {
            if (index < 0 || array.length <= index) {
                throw new Error(`Array index out of range: ${index}`);
            }
            return array[index];
        }, 
        set(index, value) {
            if (index < 0 || array.length <= index) {
                throw new Error(`Array index out of range: ${index}`);
            }
            array[index] = value;
        },
        length() {
            return array.length;
        },
    };
}

export class DynamicSizeArray {
    static INITIAL_SIZE = 4;

    constructor() {
        this.len = 0; // 論理的な要素数(要素がいくつ入っているか)
        this.array = makeFixedSizeArray(DynamicSizeArray.INITIAL_SIZE);
    }

    get(index) {
        if (index < 0 || index >= this.len) {
            throw new Error(`Index out of range: ${index}`);
        }
        return this.array.get(index);
    }

    set(index, value) {
        if (index < 0 || index >= this.len) {
            throw new Error(`Index out of range ${index}`);
        } 
        this.array.set(index, value);
    }

    length() {
        return this.len;
    }

    push(value) {
        // 必要に応じて容量を拡張(再配置)
        if (this.len >= this.array.length()) {
            // 現在の固定長配列を保存
            const old = this.array;

            // 新しい配列を2倍のサイズで確保
            this.array = makeFixedSizeArray(old.length() * 2);

            // 古い配列の要素を新しい配列にコピー
            for (let i = 0; i < this.len; i++) {
                this.array.set(i, old.get(i));
            }
        }

        // 新しい要素を末尾に追加
        this.array.set(this.len, value);
        this.len++; // 論理的な長さを1つ増やす
    }
}