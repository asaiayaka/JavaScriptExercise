// 関数にmyCallプロパティを追加する関数
export function addMyCall(fn) {
    // 関数にmyCallを定義
    fn.myCall = function (thisArg, ...args) {
        // fnをthisArgに束縛した新しい関数を作成(bind使用)
        const boundFn = this.bind(thisArg);
        // 束縛された関数に残りの引数を渡して実行
        return boundFn(...args);
    };
}