import { DynamicSizeArray } from ".";

describe('DynamicSizeArray', () => {
    test('基本操作：push, get, set, length', () => {
        const arr = new DynamicSizeArray();

        // push：初期サイズを超えるテスト(再配置を引き起こす)
        arr.push('a');
        arr.push('b');
        arr.push('c');
        arr.push('d');
        arr.push('e'); // ここで再配置されるはず

        expect(arr.length()).toBe(5);
        expect(arr.get(0)).toBe('a');
        expect(arr.get(4)).toBe('e');

        // set：値を更新
        arr.set(1, 'B');
        expect(arr.get(1)).toBe('B');
    });

    test('get/set 範囲外アクセスでエラーを出す', () => {
        const arr = new DynamicSizeArray();
        arr.push(10);

        expect(() => arr.get(1)).toThrow('Index out of range');
        expect(() => arr.set(-1, 0)).toThrow('Index out of range');
        expect(() => arr.set(2, 5)).toThrow('Index out of range');
    })
})