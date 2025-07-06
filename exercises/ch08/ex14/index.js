// 任意の数の述語関数を受け取り、
// 引数に対していずれかがtrueを返せばtrue、すべてfalseならfalseを返す
export function any(...predicates) {
    return function (value) {
        return predicates.some((predicate) => predicate(value));
    };
}

// 第一引数の関数を実行し、例外が発生した場合はcatchFnに例外を渡して結果を渡す
export function catching(tryFn, catchFn) {
    return function (...args) {
        try {
            return tryFn(...args);
        } catch (e) {
            return catchFn(e);
        }
    };
}