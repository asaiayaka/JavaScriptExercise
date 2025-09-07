import { primes } from ".";

describe("primes() 無限素数ジェネレータ", () => {
    test("最初のいくつかの素数を生成できる", () => {
        const g = primes();
        const result = [];
        for (let i = 0; i < 10; i++) {
            result.push(g.next().value);
        }

        // 最初の10個の素数を確認
        expect(result).toEqual([2, 3, 5, 7, 11, 13, 17, 19, 23, 29]);
    });

    test("呼び出しごとに次の素数を返す", () => {
        const g = primes();
        expect(g.next().value).toBe(2);
        expect(g.next().value).toBe(3);
        expect(g.next().value).toBe(5);
        expect(g.next().value).toBe(7);
    });

    test("内部に配列を保持せずに動作する(有限に止まらない)", () => {
        const g = primes();
        let bigPrime;
        for (let i = 0; i < 1000; i++) {
            bigPrime = g.next().value;
        }
        // 1000個目の素数を得られることを確認
        expect(bigPrime).toBe(7919); // 1000番目の素数
    });
});