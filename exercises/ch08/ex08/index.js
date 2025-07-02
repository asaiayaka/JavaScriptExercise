// counterGroup関数を定義
export function counterGroup() {
    // counterたちの状態を保持するプライベート配列
    const counters = [];

    return {
        // newCounter: 新しいcounterを作って返す
        newCounter() {
            // 各counterの内部状態(countの値)
            let value = 0;

            // このcounterを管理配列に追加
            const counterObj = {
                count() {
                    return value++;
                },
                reset() {
                    value = 0;
                },
                // 合計計算に使う内部アクセル用メソッド
                _getValue() {
                    return value;
                }
            };

            // 配列に登録(クロージャで参照される)
            counters.push(counterObj);
            return counterObj;
        },

        // total:全counterの合計値
        total() {
            return counters.reduce((sum, counter) => sum + counter._getValue(), 0);
        },

        // average: 平均値(存在しないとTypeError)
        average() {
            if (counters.length === 0) {
                throw new TypeError("No counters available");
            }
            return this.total() / counters.length;
        },

        // variance: 分散値(2つ未満ならTypeError)
        variance() {
            const n = counters.length;
            if (n < 2) {
                throw new TypeError("At least two counters are required");
            }

            const mean = this.average();

            const variance = counters.reduce((sum, counter) => {
                const diff = counter._getValue() - mean;
                return sum + diff * diff;
            }, 0) / n;

            return variance;
        }
    };
}