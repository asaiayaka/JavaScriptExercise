function hashString(str) { // 文字列を32bit整数のハッシュ値に変換
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = (hash * 31 + str.charCodeAt(i)) >>> 0; // str.charCodeAt(i):文字の文字コード（数値）を取得、>>> 0：正の32ビット整数に変換

    }
    return hash;
}

export function newHashTable(capacity) {
    return {
        size: 0,
        entries: new Array(capacity).fill(undefined), // 実際のデータの格納場所(配列＋チェイン法)

        put(key, value) { // 新しいキーの登録or値の更新。チェイン法=衝突回避
            const index = hashString(key) % capacity; // ハッシュ値を配列の長さで割ってインデックスを得る
            let node = this.entries[index]; // 1つの「キーと値」のセットを表すオブジェクト

            // 既にそのキーが存在するかチェック
            while (node) {
                if (node.key === key) {
                    node.value = value; // 同じキーがあれば上書き
                    return;
                }
                node = node.next; // 同じキーがなければ先頭に追加
            }

            // 新しいノードを先頭に追加(リンクリストの先頭挿入)
            const newNode = {key, value, next: this.entries[index]};
            this.entries[index] = newNode;
            this.size++;
        },

        get(key) { // 指定キーの値を取得
            const index = hashString(key) % capacity;
            let node = this.entries[index];

            while (node) {
                if (node.key === key) {
                    return node.value;
                }
                node = node.next;
            }
            return undefined;
        },
        remove (key) { // 指定キーを削除
            const index = hashString(key) % capacity;
            let node = this.entries[index];
            let prev = null;

            while (node) {
                if (node.key === key) {
                    if (prev) {
                        prev.next = node.next;
                    } else {
                        this.entries[index] = node.next;
                    }
                    this.size--;
                    return;
                }
                prev = node;
                node = node.next;
            }
        }
    };
}