function g1() {
    // thenのネストをなくすには「returnをきちんとつなげる」ことでチェーンにする
    return wait(1000)
        .then(() => {
            console.log("A");
            return wait(2000); // 次のreturnに渡す
        })
        .then(() => {
            console.log("B");
            return wait(3000); // 次のreturnに渡す
        })
        .then(() => {
            console.log("C");
        });
}

function g2() {
    //  new Promiseを使わずにPromiseチェーンをそのまま返す
    return wait(1000)
        .then(() => console.log("A"))
        .then(() => wait(2000))
        .then(() => console.log("B"))
        .then(() => wait(3000))
        .then(() => console.log("C"))
}

function g3() {
    function fetchUser() {
        return Promise.resolve({ id: 42, name: "John" });
    }
    function fetchUserFriends(user) {
        return Promise.resolve([
            { name: "Sam", id: 100 },
            { name: "Bob", id: 1 },
        ]);
    }

    // 変数宣言をなくす→thenチェーンの中で値を渡していく
    return fetchUser()
        .then((user) => 
            fetchUserFriends(user).then((friends) => ({
                user,
                friends,
            }))
        )
        .then(({ user, friends }) => {
            console.log(`${user.name} has ${friends.length} friends!`);
        });
}

function g4() {
    function someFunction() {
        return 42;
    }

    // new Promiseを使わずにPromise.resolveを利用する
    return Promise.resolve().then(() => {
        // someFunctionの結果をそのままthenの戻り値にする
        return someFunction();
    })
}