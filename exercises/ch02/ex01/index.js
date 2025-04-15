// Mapを拡張して、キーがマップ上に存在しないときに
// get()メソッドがnullの代わりに指定した値を返すようにする
class DefaultMap extends Map {
  constructor(defaultValue) {
    super();
    this.defaultValue = defaultValue;
  }

  get(key) {
    if (this.has(key)) {
      return super.get(key);
    } else {
      return this.defaultValue;
    }
  }
}

// 文字頻度ヒストグラムを計算し、表示する
class Histogram {
  constructor() {
    this.letterCounts = new DefaultMap(0);
    this.totalLetters = 0;
  }

  // text中のヒストグラムを更新する
  add(text) {
    // テキストから空白文字を取り除き、すべての文字を大文字に変換する
    text = text.replace(/\s/g, "").toUpperCase();

    // テキスト中の文字をループ
    for (let character of text) {
      let count = this.letterCounts.get(character);
      this.letterCounts.set(character, count + 1);
      this.totalLetters++;
    }
  }

  // ヒストグラムを文字列に変換してASCIIグラフィックとして表示する
  toString() {
    // マップを[キー、文字数]配列に変換する
    let entries = [...this.letterCounts];

    // 文字数順にソートする。文字数が同じときは、アルファベット順でソートする。
    entries.sort((a, b) => {
      if (a[1] === b[1]) {
        // 配列の要素は0から。1は文字数のこと。
        return a[0] < b[0] ? -1 : 1; // a[]のキーがb[]のキー寄りもアルファベット順で前にあるか確認
      } else {
        return b[1] - a[1];
      }
    });

    // 文字数をパーセントに変換する
    for (let entry of entries) {
      entry[1] = (entry[1] / this.totalLetters) * 100;
    }

    // 1%未満の文字は表示しない
    entries = entries.filter((entry) => entry[1] >= 1); // アロー関数の書き方。頻度が1以上のものをentriesに入れている

    // 各項目を1行テキストに変換する
    let lines = entries.map(
      ([l, n]) => `${l}: ${"#".repeat(Math.round(n))} ${n.toFixed(2)}%`,
      // ↑l：文字。${l}は、文字をテンプレート文字列に埋め込む。例えば、lが'A'の場合、${l}は'A'になる。
      // ↑n：頻度。Math.round(n)は、頻度を四捨五入。n.toFixed(2)は、頻度を小数点以下2桁にフォーマット。
      // ↑${n.toFixed(2)}%は、フォーマットされた頻度にパーセント記号を付ける。
    );

    // 各行を改行文字で区切って結合し、結合した文字列を返す
    return lines.join("\n");
  }
}

// このasync関数(Promiseを返す関数)は、Histogramオブジェクトを生成する。
// 標準入力からテキストを非同期に読みだし、読み出したテキストをヒストグラムに
// 追加する。テキストを最後まで読みだしたら、ヒストグラムを返す。
async function histogramFormStdin() {
  process.stdin.setEncoding("utf-8"); // process.stdin:標準入力ストリーム
  let histogram = new Histogram();
  for await (let chunk of process.stdin) {
    histogram.add(chunk);
  }
  return histogram;
}

// この最後の一行がこのプログラムのメイン部分
// 標準入力からHistogramオブジェクトを生成し、ヒストグラムを表示する。
histogramFormStdin().then((histogram) => {
  console.log(histogram.toString());
  // ↑非同期処理の結果
});
