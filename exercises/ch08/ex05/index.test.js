import {sequenceToObject} from './index'

describe('sequenceToObject', () => {
    test('正常なキーと値のペアを処理する', () => {
        expect(sequenceToObject("a", 1, "b", 2)).toEqual({a: 1, b: 2});
    });

    test('空の入力は空のオブジェクトを返す', () => {
        expect(sequenceToObject()).toEqual({});
    });

    test('キーのstringでない場合は例外を投げる', () => {
        expect(() => sequenceToObject(1, "value")).toThrow("キーの値は文字列でなければなりません");
    });

    test('引数が奇数個なら例外を投げる', () => {
        expect(() => sequenceToObject("a", 1, "b")).toThrow("引数の数は偶数でなければなりません");
    });

    test('配列とスプレッド構文を使っても動作する', () => {
        const arr = ["x", 100, "y", 200];
        expect(sequenceToObject(...arr)).toEqual({x: 100, y: 200});
    });
});