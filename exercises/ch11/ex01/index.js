export class TypeMap {
    constructor() {
        // Mapで内部データを管理
        this.map = new Map();
    }

    /**
     * 値を設定する
     * @param {Function} constructor - クラスやラッパー関数(String, Numberなど)
     * @param {*} key - 指定されたクラスのインスタンスまたはプリミティブ
     */
    set(constructor, value) {
        // キーが関数(コンストラクタ)でなければエラー
        if (typeof constructor !== 'function') {
            throw new TypeError('key must be a constructor function');
        }

        // 値がコンストラクタのインスタンスかどうかをチェック
        if (
            // プリミティブのラッパー型(String, Number, Boolean)の場合はtypeofを使って判定
            (constructor === String && typeof value === 'string') ||
            (constructor === Number && typeof value === 'number') ||
            (constructor === Boolean && typeof value === 'boolean') ||
            (value instanceof constructor) // 通常のクラスインスタンスの場合
        ) {
            this.map.set(constructor, value);
        } else {
            // 型が合わない場合はエラー
            throw new TypeError(`value must be a instance of ${constructor.name}`);
        }
    }

    /**
     * 値を取得するメソッド
     * @param {Function} constructor - クラスやラッパー関数
     * @return {*} - 保存されている値(型は保証されている)
     */
    get(constructor) {
        return this.map.get(constructor);
    }
}