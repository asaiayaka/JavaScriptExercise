import {escapeStringIfElse} from './ifelse'

describe("escapeStringIfElse", () => {
    it("should escape control characters correctly", () => {
        expect(escapeStringIfElse('\0')).toBe('\\0');
        expect(escapeStringIfElse('\b')).toBe('\\b');
        expect(escapeStringIfElse('\t')).toBe('\\t');
        expect(escapeStringIfElse('\n')).toBe('\\n');
        expect(escapeStringIfElse('\v')).toBe('\\v');
        expect(escapeStringIfElse('\f')).toBe('\\f');
        expect(escapeStringIfElse('\r')).toBe('\\r');
        expect(escapeStringIfElse('"')).toBe('\\"');
        expect(escapeStringIfElse('\'')).toBe('\\\'');
        expect(escapeStringIfElse('\\')).toBe('\\\\');
    });

    it("should return normal characters as-is", () => {
        expect(escapeStringIfElse('A')).toBe('A');
        expect(escapeStringIfElse('1')).toBe('1');
        expect(escapeStringIfElse(' ')).toBe(' ');
    });

    it("should handle mixed strings", () => {
        expect(escapeStringIfElse('Line1\nLine2\tTabbed\\Backslash')).toBe('Line1\\nLine2\\tTabbed\\\\Backslash');
    });
});
