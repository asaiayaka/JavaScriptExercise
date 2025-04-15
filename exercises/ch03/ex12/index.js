class Example {
    valueOf() {
        return 100;
    }

    toString() {
        return "文字";
    }
}

let obj = new Example();

// valueOf()が使われるケース
console.log(obj + 50);

// toString()が使われるケース
console.log("オブジェクト：" + obj);