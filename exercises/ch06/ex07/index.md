# テストコード解説

import { assign } from "./index.js";

// Object.assign() を用いて期待される結果 (expected) をあらかじめ作成しておく関数
function testCase(target, sameTarget, sources) { // target: assignに渡す対象オブジェクト、sameTarget: expectedの生成の生成用に使用
  try {
    return {
      target,
      sources, // コピー元のオブジェクト配列
      expected: Object.assign(sameTarget, ...sources),
      exception: null, // Object.assign()が例外を投げた場合の情報
    };
  } catch (e) {
    return { target, sources, expected: null, exception: e };
  }
}

const sym1 = Symbol("sym1");
const sym2 = Symbol("sym2");

// 内部値_nameはenumerable: falseにされており、通常のObject.assignではコピーされない
// ↑Object.assign()は列挙可能（enumerable）なプロパティのみをコピーする
// nameはenumerable: falseのためコピーの対象にならず、新しいオブジェクトにはコピーされない
function getterSetterObj(name) {
  const obj = {
    get name() {
      return this._name; //　_: 非公開の変数、ゲッターセッター経由でnameプロパティを読み書きできているが、実体はthis._nameに保持されている
    },
    set name(v) {
      this._name = v;
    },
  };
  return Object.defineProperty(obj, "_name", {
    value: name,
    enumerable: false,
    writable: true,
    configurable: false,
  });
}

const objWithSymbolProps = {
  [sym1]: "symbol1",
};
Object.defineProperty(objWithSymbolProps, sym2, {
  enumerable: false,
  value: "symbol2",
});

test.each([
    // 基本的な空配列のケース
  testCase({ foo: "foo" }, { foo: "foo" }, []),

  // 複数のオブジェクトのマージ
  testCase({}, {}, [
    { foo: "foo", bar: "bar" },
    { fizz: "fizz", buzz: "buzz" },
  ]),

  // 上書きが発生するケース
  testCase({ foo: "foo", hello: "world" }, { foo: "foo", hello: "world" }, [
    { foo: "fooo", bar: "bar" },
    { foo: "foooo", fizz: "fizz", buzz: "buzz" },
  ]),

  // ネストされたオブジェクト（ただし"assign"は浅い（=1階層目まで）コピー）
  testCase(
    { parent: { child: { foo: "fooo", bar: "bar" } } },
    { parent: { child: { foo: "fooo", bar: "bar" } } },
    [{ parent: { child: { fizz: "fizz", buzz: "buzz" } } }],
  ),

  // プリミティブ値や配列など、通常"Object.assign"では無視されるもの
  testCase({ foo: "foo", hello: "world" }, { foo: "foo", hello: "world" }, [
    123,
    true,
    ["aa", "bb", "cc"],
    null,
    undefined,
  ]),
  // targetがプリミティブの場合（例外が発生する）
  testCase(1, 1, [{ foo: "foo", bar: "bar" }]),
  testCase(true, true, [{ foo: "foo", bar: "bar" }]),
  // "target"が配列や特殊オブジェクトの場合
  testCase(
    ["aa", "bb", "cc"],
    ["aa", "bb", "cc"],
    [{ foo: "foo", bar: "bar" }],
  ),
  testCase(new Map(), new Map(), [{ foo: "foo", bar: "bar" }]),
  testCase(new Date(), new Date(), [{ foo: "foo", bar: "bar" }]),
  // null / undefinedは"Object.assign"では例外が出る
  testCase(null, null, [{ foo: "foo", bar: "bar" }]),
  testCase(undefined, undefined, [{ foo: "foo", bar: "bar" }]),
  // Symbolプロパティ付きオブジェクトのマージ
  testCase({ foo: "foo" }, { foo: "foo" }, [objWithSymbolProps]),
  // getter / setterオブジェクトのマージ
  testCase(getterSetterObj("alice"), getterSetterObj("alice"), [
    getterSetterObj("bob"),
  ]),
])(
    //
  "test case $#: expected: $expected, exception: $exception",
  ({ target, sources, expected, exception }) => {
    // exceptionがある場合は、assign()も例外を投げることを期待
    if (exception) {
      expect(() => assign(target, ...sources)).toThrowError(exception);
    } else { // 例外がない場合はassign()の結果がObject.assign()と同じになることを検証
      expect(assign(target, ...sources)).toEqual(expected);
    }
  },
);
