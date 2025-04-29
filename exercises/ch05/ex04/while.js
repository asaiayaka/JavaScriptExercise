export function fibonacciWhile() {
    let fib = [1,1];
    let i = 2;
    while (fib.length < n) {
        fib.push(fib[i - 1] + fib[i - 2]);
        i++;
    }
    return fib;
}