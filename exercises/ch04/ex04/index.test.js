import { bitCount } from ".";

describe ("bitCount", () => {
    it ("counts 1s in 0b111 (should be 3)", () => {
        expect(bitCount(0b111)).toBe(3);
    });

    it ("counts 1s in 0b111...111 (31 ones)", () => {
        expect(bitCount(0b1111111111111111111111111111111)).toBe(31);
    });

    it ("counts 1s in 0 (should be 0)", () => {
        expect(bitCount(0)).toBe(0);
    });

    it ("counts 1s in 0xFFFFFFFF (all 32 bits 1", () => {
        expect(bitCount(0xFFFFFFFF)).toBe(32);
    });

    it ("counts 1s in negative number -1 (should also be 32)", () => {
        expect(bitCount(-1)).toBe(32);
    });

    it ("counts 1s in 10 (1010 in binary)", () => {
        expect(bitCount(10)).toBe(2);
    });
})