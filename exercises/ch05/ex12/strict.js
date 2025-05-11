function showThis() {
    console.log(this); // グローバルオブジェクト（strict モードならerror）
    this.message = "Hello from strict!";
}

showThis();
console.log(global.message);