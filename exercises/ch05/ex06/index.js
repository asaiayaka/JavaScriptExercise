function orderTryCatchFinally() {
    try {
        console.log("tryブロック");
        throw new Error("エラー");
    } catch (e) {
        console.log("catchブロック: " + e.message);
    } finally {
        console.log("finallyブロック");
    }
}

orderTryCatchFinally();