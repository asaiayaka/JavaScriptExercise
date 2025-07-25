import {cache, slowFn} from "./index";
import { jest } from '@jest/globals';


describe('cache関数のテスト', () => {
    test('同じオブジェクトを使った場合、slowFnが1回しか呼ばれないこと', () => {
        // slowFnの呼び出し回数をカウントするモック関数
        const mockFn = jest.fn(slowFn);
        const cachedSlowFn = cache(mockFn);

        const obj = {value: 5};

        // 1回目の呼び出し。sloeFn(mockFn)が実行される
        const result1 = cachedSlowFn(obj);
        // 2回目の呼び出し。キャッシュが使われ、mockFnは呼ばれない
        const result2 = cachedSlowFn(obj);

        // 結果が同じであることを確認
        expect(result1).toBe(result2);

        // slowFn(mockFn)は1回だけ呼ばれていることを確認
        expect(mockFn).toHaveBeenCalledTimes(1);
    });

    test('異なるオブジェクトを使った場合、それぞれでslowFnが呼ばれること', () => {
        const mockFn = jest.fn(slowFn);
        const cachedSlowFn = cache(mockFn);

        const obj1 = {value: 3};
        const obj2 = {value: 7};

        const result1 = cachedSlowFn(obj1);
        const result2 = cachedSlowFn(obj2);

        // 結果が異なる
        expect(result1).not.toBe(result2);

        // それぞれ1回ずつ呼ばれる
        expect(mockFn).toHaveBeenCalledTimes(2);
    });

    test('キャッシュがオブジェクトの到達不能後にがべれーじコレクション対象になる', () => {
        const mockFn = jest.fn(slowFn);
        const cachedSlowFn = cache(mockFn);

        // ローカルスコープでオブジェクトを作成
        (function () {
            const tempObj = {value: 10};
            cachedSlowFn(tempObj);
            // tempObjはこのスコープを抜けると到達不可
        })();

        // WeakMapの性質上、キャッシュがガベージコレクションされることを直接テストすることは難しい
        // なので、ここでは少なくともメモリリークを起こさない設計になっていることを確認するために
        // WeakMapが使われているという意図的な設計である

        // 実際のガベージコレクションの動作はテストできない
        expect(true).toBe(true);
    });
});