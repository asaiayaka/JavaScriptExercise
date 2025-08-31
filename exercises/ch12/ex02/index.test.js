import { fibonacciIter } from ".";

describe("fibonacciIter", () => {
    test("明示的にnext()を呼び出した場合にフィボナッチ数列が返る", () => {
        const it = fibonacciIter();
        expect(it.next().value).toBe(1);
        expect(it.next().value).toBe(1);
        expect(it.next().value).toBe(2);
        expect(it.next().value).toBe(3);
        expect(it.next().value).toBe(5);
        expect(it.next().value).toBe(8);
    });

    test("for-ofで最初の10項を取得できる", () => {
        const it = fibonacciIter();
        const result = [];
        for (const v of it) {
            result.push(v);
            if (result.length >= 10) {
                break;
            }
        }
        expect(result).toEqual([1, 1, 2, 3, 5, 8, 13, 21, 34, 55]);
    });

    test("途中でbreakするとreturn()が呼ばれる", () => {
        const it = fibonacciIter();
        const result = [];
        for (const v of it) {
            result.push(v);
            if (result.length >= 3) {
                break; // break時にreturn()が呼ばれる
            }
        }
        expect(result).toEqual([1, 1, 2]);
    });
});