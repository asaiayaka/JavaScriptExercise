export function f(body) {
    // サポートする最大の引数数
    const maxArgs = 10;

    // 引数名の配列を作成["_1", "_2", ..., "_10"]
    const args = Array.from({ length: maxArgs }, (_, i) => `_${i + 1}`);

    // body中の$1 ~ $10を対応する引数名 _1 ~ _10 に置き換える
    let replacedBody = body;
    for (let i = maxArgs; i >= 1; i--) {
        const regex = new RegExp(`\\$${i}\\b`, 'g'); // 正規表現：単語協会を含むことで$10が$1 + "0"と誤解されない。\\$：$ という文字そのものにマッチ。${i}：$1, $2, ..., $10 の番号。\\b：数字の直後が「単語の区切り」のときだけマッチ（$10 と $1 を区別するため）
        replacedBody = replacedBody.replace(regex, `_${i}`);
    }

    // bodyが{...}形式で始まるならそのまま、それ以外ならreturnを付ける
    const isBlock = replacedBody.trim().startsWith("{");
    const finalBody = isBlock ? replacedBody : `return ${replacedBody};`;
    // Functionコンストラクタを使って関数を作成
    return new Function(...args, finalBody);
}