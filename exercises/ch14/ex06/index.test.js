import { createMethodLogger } from ".";

describe("createMethodLogger", () => {
    test("メソッド呼び出しを履歴に記録できる", () => {
        const obj = {
            add(a, b) {
                return a + b;
            },
            greet(name) {
                return `Hello, ${name}`;
            },
        };

        const { proxy, history } = createMethodLogger(obj);

        // メソッドを呼び出す
        expect(proxy.add(2, 3)).toBe(5);
        expect(proxy.greet("Alice")).toBe("Hello, Alice");

        // 履歴配列に2件記録されている
        expect(history.length).toBe(2);

        // 最初の呼び出しの内容を確認
        expect(history[0].method).toBe("add");
        expect(history[0].args).toStrictEqual([2, 3]);
        expect(history[0].timestamp instanceof Date).toBe(true);

        // 2件目の呼び出しの内容
        expect(history[1].method).toBe("greet");
        expect(history[1].args).toStrictEqual(["Alice"]);
        expect(history[1].timestamp instanceof Date).toBe(true);
    });

    test("メソッド以外のプロパティはそのまま返る", () => {
        const obj = { x: 10 };
        const { proxy, history } = createMethodLogger(obj);

        expect(proxy.x).toBe(10);
        expect(history.length).toBe(0);
    });

    test("履歴は呼び出しごとに順番に追加される", () => {
        const obj = {
            foo() {},
            bar() {},
        };
        const { proxy, history } = createMethodLogger(obj);

        proxy.foo();
        proxy.bar();
        proxy.foo();

        expect(history.map(h => h.method)).toStrictEqual(["foo", "bar", "foo"]);
    });
});