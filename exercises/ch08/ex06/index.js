const args = [];

function call(...receivedArgs) { // ...receivedArgs: 関数に渡されたすべての引数を配列として受け取る→argumentsを使わずに、同じように引数を配列として処理できる
    args.push(receivedArgs); // Array.from(arguments)の代わりにreceivedArgsをそのまま使えばよくなる
}

call(1, 2, 3);
call("A", "B");

console.log(args[0]); // [1, 2, 3]
console.log(args[1]); // ["A", "B"]

