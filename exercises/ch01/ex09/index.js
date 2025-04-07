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

class WordHistogram {
    constructor() {
        this.WordHistogram = new DefaultMap(0);
        this.totalWord = 0;
    }

    // テキストを受け取り、単語頻度ヒストグラムを更新
    add(text) {
        // 単語の抽出
        const matches = text.toLowerCase().matchAll(/\w+|\$[\d.]+|\S+/g);
        const words = [...matches].map((r) => r[0]);

        for (let word of words) {
            let count = this.wordCounts.set(word, count + 1);
            this.totalWord++;
        }
    }

    // ヒストグラムを文字列にして返す
    toString() {
        let entries = [...this.wordCounts];

        // 出現頻度順に並べる。同頻度なら辞書順
        entries.sort((a, b) => {
            if (a[1] === b[1]) {
                return a[0] < b[0] ? -1 : 1;
            } else {
                return b[1] - a[1];
            }
        });

        // 単語数をパーセントに変換する
        for (let entry of entries) {
            entry[1] = entry[1] / this.totalWord * 100;
        }

        // 出現頻度0.5%以上を取得
        entries = entries.filter((entry) => entry[1] >= 0.5);

        // padStartで表示幅をそろえる　/ # の数をnではなく 10 * n に変更
        const lines = entries.map(
            ([l, n]) => 
                `${l.padStart(10)}: ${"#".repeat(Math.round(10*n))} ${n.toFixed(2)}%`
            // ↑l：文字。${l}は、文字をテンプレート文字列に埋め込む。例えば、lが'A'の場合、${l}は'A'になる。
            // ↑n：頻度。Math.round(n)は、頻度を四捨五入。n.toFixed(2)は、頻度を小数点以下2桁にフォーマット。
            // ↑${n.toFixed(2)}%は、フォーマットされた頻度にパーセント記号を付ける。
        )
        return lines.join("\n");
    }
}

// 標準入力からWordHistogramを生成する関数
async function wordHistogramFormStdin() {
    process.stdin.setEncoding("utf-8");
    let histogram = new WordHistogram();

    for await (let chunk of process.stdin) {
        histogram.add(chunk);
    }

    return histogram;
}

// メイン処理：標準入力から読み取って出力
wordHistogramFormStdin().then(histogram => {
    console.log(histogram.toString());
});