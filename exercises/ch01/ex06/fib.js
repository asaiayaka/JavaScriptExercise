export function fib(n) {
    const memo = {};

    function fibMemo(n) {
        if (n in memo) {
            return memo[n];
        }
        if (n <= 1) {
            return n;
        }
        memo[n] = fibMemo(n - 1) + fibMemo(n - 2);
        return memo[n];
    }

    return fibMemo(n);
}