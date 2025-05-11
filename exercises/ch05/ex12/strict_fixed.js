function showThis(context) {
    console.log(context); // 明示的にthisを返す
    context.message = "Hello from strict-fixed!";
}

const obj = {}; // objをthisの代わりに明示的に関数に渡す
showThis(obj); // contextパラメータとしてobjを受け取り、そのオブジェクトにmessageプロパティを追加
console.log(obj.message);