// 独自プロパティを持つオブジェクトを生成
const original = {
    greeting: "こんにちは",
    sayHello() {
        console.log(this.greeting);
    }
};

// Object.createを使ってoriginalをプロパティをプロトタイプとする新しいオブジェクトを生成
const child = Object.create(original);

// プロトタイプを確認
console.log(Object.getPrototypeOf(child) === original);

// 動作確認(プロトタイプ継承されているか)
child.sayHello();