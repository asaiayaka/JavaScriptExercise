// 1. 文字cをn回コンソール出力し、cをn個含む配列を返す関数
export const repeatChar = (n, c) => {
    // 引数が二つ以上あるので括弧は必要
    for (let i = 0; i < n; i++) {
        console.log(c);
    }
    return Array(n).fill(c); // Array(n): 長さがnの配列を作成。.fill(c): 配列の全要素にcを入れて埋める。
}

// 2. 数値xを2乗して返す関数
export const square = x => x * x;

// 引数が1つだけなので括弧は省略可能
// 戻り値が1行の式なので{}とreturnを省略可能(式が戻り値)

// 3. 現在時刻のプロパティnowを含むオブジェクトを返す関数
export const getNow = () => (
    {now: new Date()}
);
    // 引数なしなので括弧が必要(空の括弧)
    // オブジェクトを返すには{}を()で囲む必要がある({}だけだと関数ブロックと解釈されるため)
