import { Warrior, MagicWarrior } from "./index_proro";

describe('Warrior(戦士: prototype)のテスト', () => {
    test('attack()はatkの2倍の値を返す', () => {
        const w = new Warrior(8);
        expect(w.attack()).toBe(16);
    });
});

describe('MagicWarriror(魔法戦士: prototype)のテスト', () => {
    test('attack()はWarriorの攻撃 + 自身の魔力を返す', () => {
        const mw = new MagicWarrior(8, 4); // atk = 8, mgc = 4
        expect(mw.attack()).toBe(20); // 8 * 2 + 4
    });

    test('異なる値での動作確認', () => {
        const mw = new MagicWarrior(5, 7);
        expect(mw.attack()).toBe(17); // 5 + 2 + 7
    });
});