// 戦士クラス
export class Warrior {
    constructor(atk) {
        this.atk = atk; // 攻撃力フィールド
    }

    attack() {
        // 攻撃力の2倍のダメージを返す
        return this.atk * 2;
    }
}

// 魔法戦士クラス(戦士を継承)
export class MagicWarriror extends Warrior {
    constructor(atk, mgc) {
        super(atk); // 親クラスのatkを継承
        this.mgc = mgc; // 魔力フィールド
    }
    attack() {
        // 親のattack結果 + 自身の魔力をダメージとして返す
        return super.attack() + this.mgc;
    }
}