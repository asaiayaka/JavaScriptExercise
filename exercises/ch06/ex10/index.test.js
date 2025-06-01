test('オブジェクト構造が一致すること', () => {const obj1 = {
    foo: Math.random(),
    bar: Math.random(),
};

const obj2 = {
    fizz: Math.random(),
    buzz: Math.random(),
}

const obj3 = {
    bar: Math.random(),
    buzz: Math.random(),
};

const num1 = Math.random();
const num2 = Math.random();

const arr1 = [Math.random(), Math.random(), Math.random()];
const arr2 = [Math.random(), Math.random()];

const obj = {
    num1: num1,
    num2: num2,
    foo: obj1.foo,
    bar: obj3.bar,
    fizz: obj2.fizz,
    buzz: obj2.buzz,
    arr: [...arr1, num1, ...arr2],
};

const answer = {
    num1,  // num1は変数名とキーが同じなので、プロパティの簡略記法でそのまま書ける
    num2, // num2も同様
    foo: obj1.foo, // obj1.fooを参照
    bar: obj3.bar, // barも同様
    ...(({fizz, buzz}) => ({fizz, buzz}))(obj2), // obj2からfizzとbuzzを抽出し、新しいオブジェクト{fizz, buzz}を返す関数を即時実行している。...でコピー→fizz: obj2.fizz, buzz: obj2.buzzと同じ
    arr: [...arr1, num1, ...arr2], // arr1[0], arr1[1], arr1[2], num1, arr2[0], arr2[1]と同じ意味

};

expect(answer).toEqual(obj);
});