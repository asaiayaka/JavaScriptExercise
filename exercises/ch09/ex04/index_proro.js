// 戦士クラス(prototype構文)
export function Warrior(atk) {
    this.atk = atk; // 攻撃フィールド
}

Warrior.prototype.attack = function () {
    return this.atk * 2;
};

// 魔法戦士クラス(戦士クラスを継承)
export function MagicWarrior(atk, mgc) {
    Warrior.call(this, atk); // 親クラスのコンストラクタ呼び出し
    this.mgc = mgc; // 魔力フィールド
}

// プロトタイプ継承設定
MagicWarrior.prototype = Object.create(Warrior.prototype);
MagicWarrior.prototype.constructor = MagicWarrior;

// attackメソッドのオーバーライド
MagicWarrior.prototype.attack = function () {
    return Warrior.prototype.attack.call(this) + this.mgc;
};