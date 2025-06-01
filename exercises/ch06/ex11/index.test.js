import { createPolarPoint } from ".";

describe('createPolarPoint', () => {
    test('初期値が正しく設定されている', () => {
        const point = createPolarPoint(5, Math.PI / 4);
        expect(point.r).toBeCloseTo(5);
        expect(point.theta).toBeCloseTo(Math.PI / 4);
        expect(point.x).toBeCloseTo(5 * Math.cos(Math.PI / 4));
        expect(point.y).toBeCloseTo(5 * Math.cos(Math.PI / 4));
    });

    test('xを設定するとrとthetaが更新される', () => {
        const point = createPolarPoint(5, Math.PI / 4);
        point.x = 3;
        expect(point.x).toBeCloseTo(3);
        expect(point.r).toBeCloseTo(Math.sqrt(3 * 3 + point.y * point.y));
        expect(point.theta).toBeCloseTo(Math.atan2(point.y, 3));
    });

    test('yを設定するとrとthetaが更新される', () => {
        const point = createPolarPoint(5, Math.PI / 4);
        point.y = 4;
        expect(point.y).toBeCloseTo(4);
        expect(point.r).toBeCloseTo(Math.sqrt(point.x * point.x + 4 * 4));
        expect(point.theta).toBeCloseTo(Math.atan2(4, point.x));
    });

    test('rとthetaのsetterが正しく動作する', () => {
        const point = createPolarPoint();
        point.r = 10;
        point.theta = Math.PI / 2;
        expect(point.r).toBe(10);
        expect(point.theta).toBe(Math.PI / 2);
        expect(point.x).toBeCloseTo(0);
        expect(point.y).toBeCloseTo(10);
    });

    test('NaNをxに設定した場合に例外をスローする', () => {
        const point = createPolarPoint();
        expect(() => {
            point.x = NaN;
        }).toThrow("xにNaNを設定することはできません");
    });

    test('NaNをyに設定した場合に例外をスローする', () => {
        const point = createPolarPoint();
        expect(() => {
            point.y = NaN;
        }).toThrow("yにNaNを設定することはできません");
    });

    test('デフォルト引数が0で初期化される', () => {
        const point = createPolarPoint();
        expect(point.r).toBe(0);
        expect(point.theta).toBe(0);
        expect(point.x).toBe(0);
        expect(point.y).toBe(0);
    });
});