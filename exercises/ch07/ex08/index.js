// npm install grapheme-splitterを実行
// grapheme-splitterライブラリは、内部でUnicode標準(UAX#29)に基づいて、サロゲートペア・結合文字(""、濁点など)・ゼロ幅接合子(ZWJ)でつながった複合絵文字等をすべて1つの「書記素クラスタ」として扱ってくれる
import GraphemeSplitter from "grapheme-splitter";

const splitter = new GraphemeSplitter();

export function reverse(str) {
    const graphemes = splitter.splitGraphemes(str); // 書記素単位で分割
    return graphemes.reverse().join('');
}