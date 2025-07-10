import { instanceOf } from ".";

describe('instanceof関数のテスト', () => {
    test('基本的なインスタンスとコンストラクタの一致', () => {
        class Animal {}
        class Dog extends Animal {}
        
        const d = new Dog();
        expect(instanceOf(d, Dog)).toBe(true); // Dogのインスタンス
        expect(instanceOf(d, Animal)).toBe(true); // Animalを継承している
    });

    test('多段継承で基底クラスまでチェックできること', () => {
        class A {}
        class B extends A {}
        class C extends B {}

        const c = new C();
        expect(instanceOf(c, C)).toBe(true);
        expect(instanceOf(c, B)).toBe(true);
        expect(instanceOf(c, A)).toBe(true); // 多段継承でAまで到達
    });

    test('継承関係がない場合はfalseを返す', () => {
        class A {}
        class B {}

        const a = new A();
        expect(instanceOf(a, B)).toBe(false); // AとBに関係なし
    });

    test('プリミティブ値やnull/undefinedに対してfalseを返す', () => {
        class Something {}

        expect(instanceOf(null, Something)).toBe(false);
        expect(instanceOf(undefined, Something)).toBe(false);
        expect(instanceOf(123, String)).toBe(false); // 123はプリミティブ
        expect(instanceOf("abc", String)).toBe(false); // "abc"も同様
    });

    test('コンストラクタが関数でない場合', () => {
        const obj = {};
        expect(instanceOf(obj, null)).toBe(false);
        expect(instanceOf(obj, {})).toBe(false);
    });
});