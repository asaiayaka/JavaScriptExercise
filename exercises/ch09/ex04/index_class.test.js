import { Warrior, MagicWarriror } from "./index_class";

describe('Warrior(戦士クラス)のテスト', () => {
    test('attack()はatkの2倍の値を返すこと', () => {
        const w = new Warrior(10);
        expect(w.attack()).toBe(20);
    });
});

describe('MagicWarrior(魔法戦士クラス)のテスト', () => {
    test('attack()はWarriorの攻撃 + 自身の魔力を返すこと', () => {
        const mw = new MagicWarriror(10, 5); // atk = 10, mgc = 5
        expect(mw.attack()).toBe(25); // 10 * 2 + 5
    });

    test('異なる値でも動作確認', () => {
        const mw = new MagicWarriror(7, 3);
        expect(mw.attack()).toBe(17); // 7 * 2 + 3 
    });
});