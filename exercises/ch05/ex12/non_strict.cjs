function showThis() {
    console.log(this); // グローバルオブジェクト（非 strict モードならOK）
    this.message = "Hello from non strict";
}

showThis();
console.log(global.message);