describe("math", () => {
    describe("fib", () => {
        it("return 0 for fib(0)", () => {
            expect(fib(0)).toBe(0);
        });
        it("return 1 for fib(1)", () => {
            expect(fib(1)).toBe(1);
        });
        it("return 5 for fib(5)", () => {
            expect(fib(5)).toBe(5);
        });
        it("returns 2111485077978050 for fib(75)", () => {
            expect(fib(75)).toBe(2111485077978050);
        });
    });
});