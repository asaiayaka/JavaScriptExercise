import { TypeMap } from ".";

// テスト用のカスタムクラス
class Foo {}
class Bar {}

describe("TypeMapクラスのテスト", () => {
  let typeMap;

  // 各テストの前に新しいTypeMapを初期化
  beforeEach(() => {
    typeMap = new TypeMap();
  });

  test("Stringに文字列をセットして取得できること", () => {
    typeMap.set(String, "hello");
    expect(typeMap.get(String)).toBe("hello");
  });

  test("Numberに数値をセットして取得できること", () => {
    typeMap.set(Number, 42);
    expect(typeMap.get(Number)).toBe(42);
  });

  test("Booleanに真偽値をセットして取得できること", () => {
    typeMap.set(Boolean, true);
    expect(typeMap.get(Boolean)).toBe(true);
  });

  test("カスタムクラスFooにインスタンスをセットして取得できること", () => {
    const fooInstance = new Foo();
    typeMap.set(Foo, fooInstance);
    expect(typeMap.get(Foo)).toBe(fooInstance);
  });

  test("別のクラス(Bar)にFooのインスタンスをセットするとエラーになること", () => {
    const fooInstance = new Foo();
    expect(() => {
      typeMap.set(Bar, fooInstance);
    }).toThrow(TypeError);
  });

  test("Date に文字列をセットするとエラーになること", () => {
    expect(() => {
      typeMap.set(Date, "not a date");
    }).toThrow(TypeError);
  });

  test("Date に Date インスタンスをセットできること", () => {
    const date = new Date();
    typeMap.set(Date, date);
    expect(typeMap.get(Date)).toBe(date);
  });

  test("プリミティブ以外のキーを使うとエラーになること", () => {
    expect(() => {
      typeMap.set("notAFunction", "value");
    }).toThrow(TypeError);
  });

  test("型が一致しないプリミティブをセットするとエラーになること", () => {
    expect(() => {
      typeMap.set(Number, "123"); // 文字列を数値のコンストラクタにセット → エラー
    }).toThrow(TypeError);
  });

  test("型が一致すれば Map として複数の値を扱えること", () => {
    typeMap.set(String, "abc");
    typeMap.set(Number, 100);
    typeMap.set(Boolean, false);
    const foo = new Foo();
    typeMap.set(Foo, foo);

    expect(typeMap.get(String)).toBe("abc");
    expect(typeMap.get(Number)).toBe(100);
    expect(typeMap.get(Boolean)).toBe(false);
    expect(typeMap.get(Foo)).toBe(foo);
  });
});
