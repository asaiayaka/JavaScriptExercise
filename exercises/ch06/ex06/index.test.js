import { collectionPropertyNames } from './index'

describe('collectionPropertyNames', () => {
    test('自身のプロパティのみ', () => {
        const sym = Symbol('s');
        const obj = {
            a: 1, // 通常の列挙可能な自分のプロパティ
            [sym]: 2 // Symbol型の自分のプロパティ(列挙可能)
        };
        // 非列挙のプロパティ"hidden"を定義
        // hiddenは列挙不可だが、自分のプロパティなので対象になる
        Object.defineProperty(obj, 'hidden', {
            value: 'secret',
            enumerable: false
        });

        const result = collectionPropertyNames(obj);
        expect(result).toContain('a');
        expect(result).toContain(sym);
        expect(result).toContain('hidden');
    });

    test('継承プロパティの列挙', () => {
        const proto = {
            inherited: 42 // プロトタイプから継承された列挙可能なプロパティ→含めるべき
        };
        // 非列挙なプロパティを親に定義
        Object.defineProperty(proto, 'nonEnumInherited', {
            value: 'nope',
            enumerable: false
        });

        // protoを親に持つobjを作成
        const obj = Object.create(proto);
        obj.own = true; // own: 自分のプロパティ(列挙可能)→含めるべき

        const result = collectionPropertyNames(obj);
        expect(result).toContain('own'); // 自身のプロパティ
        expect(result).toContain('inherited'); // 列挙可能な継承プロパティ
        expect(result).not.toContain('nonEnumInherited'); // 非列挙は含まれない
    });

    test('継承されたSymbolは含まれない', () => {
        const sym = Symbol('inheritedSym');
        const proto = {
            [sym]: 'value'
        };

        // Symbolプロパティを列挙可能に明示的に設定(ただしfor...inでは無視される)
        Object.defineProperty(proto, sym, {
            enumerable: true
        });
        const obj = Object.create(proto);

        const result = collectionPropertyNames(obj);
        expect(result).not.toContain(sym); // Symbolは継承されても含まれない
    });
});