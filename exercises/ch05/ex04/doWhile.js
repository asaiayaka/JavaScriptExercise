export function fibonacciDoWhile(n) {
    let fib = [1,1];
    let i = 2;
    do {
        if (fib.length < n) {
            break;
        }
        fib.push(fib[i - 1] + fib[i - 2]);
        i++;
    } while(true);
    return fib;
}