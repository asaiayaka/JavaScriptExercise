import { TypedMap } from ".";

describe('TypedMap(コンポジション)', () => {
    test('正しい方の初期エントリで初期化できる', () => {
        const m = new TypedMap('string', 'number', [['a', 1], ['b', 2]]);
        expect(m.get('a')).toBe(1);
        expect(m.size).toBe(2);
    });

    test('初期エントリで型が一致しない場合はエラーをスローする', () => {
        expect(() => {
            new TypedMap('string', 'number', [['a', 1], [2, 'wrong']]);
        }).toThrow(TypeError);
    });

    test('set()で正しい方なら追加できる', () => {
        const m = new TypedMap('string', 'boolean');
        m.set('flag', true);
        expect(m.get('flag')).toBe(true);
    });

    test('set()で値が間違っていたらエラーをスロー', () => {
        const m = new TypedMap('string', 'boolean');
        expect(() => m.set('ok', 123)).toThrow(TypeError);
    });

    test('has(), delete(), clear()などMapのAPIを委譲して使える', () => {
        const m = new TypedMap('string', 'number');
        m.set('x', 10);
        expect(m.has('x')).toBe(true);
        m.delete('x');
        expect(m.has('x')).toBe(false);
        m.set('y', 20);
        m.set('z', 30);
        m.clear();
        expect(m.size).toBe(0);
    });

    test('for...ofに対応している(イテラブル)', () => {
        const m = new TypedMap('string', 'number', [['a', 1], ['b', 2]]);
        const entries = [...m];
        expect(entries).toEqual([['a', 1], ['b', 2]]);
    });
});