/**
 * 単方向リンクリストの基本実装クラス
 */
export class LinkedList {
  // リストの先頭と末尾ノードを private フィールドで管理する
  #head = null;
  #tail = null;

  constructor() {
    this.#head = null;
    this.#tail = null;
  }

  /**
   * 要素をリストの末尾に追加する
   * @param {*} value - 追加する値
   */
  push(value) {
    const newNode = { value, next: null };
    if (!this.#head) {
      // 最初のノードの場合は、head と tail を同じノードにする
      this.#head = newNode;
      this.#tail = newNode;
    } else {
      // すでにノードが存在する場合は、末尾に新ノードを追加し、tail を更新
      this.#tail.next = newNode;
      this.#tail = newNode;
    }
  }

  /**
   * 複数の要素をリストの末尾に追加する
   * @param  {...any} items - 複数の追加する値
   */
  pushAll(...items) {
    // 一つずつ push() を使って追加
    items.forEach((item) => this.push(item));
  }

  /**
   * リストの内容を文字列で返す（例: [1, 2, 3]）
   * @returns {string}
   */
  toString() {
    let current = this.#head;
    const values = [];

    // リストを順にたどり、値を配列に追加
    while (current) {
      values.push(current.value);
      current = current.next;
    }

    return "[" + values.join(", ") + "]";
  }
}

/**
 * push操作の回数を記録する LinkedList のラッパークラス
 * 
 * 継承ではなく「合成（composition）」を使って、
 * push() 操作をラップすることで push 回数を安全に記録する
 */
export class InstrumentedLinkedList {
  #list = new LinkedList(); // 内部で LinkedList を保持（合成）
  #pushCount = 0;           // push 操作が行われた回数をカウント

  /**
   * 現在までの push 回数を取得する
   */
  get pushCount() {
    return this.#pushCount;
  }

  /**
   * 要素をリストに追加し、push 回数を記録する
   * @param {*} value 
   */
  push(value) {
    this.#list.push(value); // 内部のリストに追加
    this.#pushCount++;      // push 回数をインクリメント
  }

  /**
   * 複数の要素をリストに追加する
   * push() を使って追加するため、pushCount も自動で増える
   * @param  {...any} items 
   */
  pushAll(...items) {
    items.forEach((item) => this.push(item));
  }

  /**
   * リストの内容を文字列で取得する
   * 内部の LinkedList の toString() をそのまま呼び出す
   */
  toString() {
    return this.#list.toString();
  }
}
