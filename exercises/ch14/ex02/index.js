export class MyArrayLike {
  // TODO
  constructor(...items) {
    // map()/slice()から呼ばれるときは長さだけが渡されるケースがある
    if (items.length === 1 && typeof items[0] === "number") {
      this.length = items[0];
    } else {
      const arr = items.length === 1 && Array.isArray(items[0]) ? items[0] : items;
      this.length = arr.length;
      for (let i = 0; i < arr.length; i++) {
        this[i] = arr[i];
      }
    }
  }

  // Array.fromやfor...ofで使えるようにイテレータを実装
  [Symbol.iterator]() {
    let index = 0;
    const self = this;
    return {
      next() {
        if (index < self.length) {
          return { value: self[index++], done: false };
        }
        return { done: true };
      }
    };
  }
}
// Arrayを継承したクラス
export class MyArray extends Array {
  constructor(items) {
    super(...items);
  }

  // TODO
  // map()/slice()の結果をMyArrayLikeにする
  static get [Symbol.species]() {
    return MyArrayLike;
  }

}
