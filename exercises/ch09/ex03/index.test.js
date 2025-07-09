import {PositiveNumber} from "./index"

describe('PositiveNumber', () =>{
    test('正の数で初期化', () => {
        const num = PositiveNumber(10);
        expect(num.getX()).toBe(10);
    });

    test('0以下で初期化するとエラーになる', () => {
        expect(() => PositiveNumber(0)).toThrow("require: x > 0");
        expect(() => PositiveNumber(-5)).toThrow("require: x > 0");
    });

    test('正の値にsetXで変更できる', () => {
        const num = PositiveNumber(5);
        num.setX(20);
        expect(num.getX()).toBe(20);
    });

    test('0以下の値をsetXするとエラーになる', () => {
        const num =  PositiveNumber(5);
        expect(() => num.setX(0)).toThrow("require: x > 0");
        expect(() => num.setX(-5)).toThrow("require: x > 0");
    });

    test('外部からvalueにアクセスできない', () => {
        const num = PositiveNumber(100);
        expect(num.value).toBeUndefined();
        num.value = -999;
        expect(num.getX()).toBe(100);
    });
});