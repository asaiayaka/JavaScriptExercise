import {escapeStringSwitch} from './switch.js'

describe("escapeStringSwitch", () => {
    it("should escape control characters correctly", () => {
        expect(escapeStringSwitch('\0')).toBe('\\0');
        expect(escapeStringSwitch('\b')).toBe('\\b');
        expect(escapeStringSwitch('\t')).toBe('\\t');
        expect(escapeStringSwitch('\n')).toBe('\\n');
        expect(escapeStringSwitch('\v')).toBe('\\v');
        expect(escapeStringSwitch('\f')).toBe('\\f');
        expect(escapeStringSwitch('\r')).toBe('\\r');
        expect(escapeStringSwitch('"')).toBe('\\"');
        expect(escapeStringSwitch('\'')).toBe('\\\'');
        expect(escapeStringSwitch('\\')).toBe('\\\\');
    });

    it("should return normal characters as-is", () => {
        expect(escapeStringSwitch('A')).toBe('A');
        expect(escapeStringSwitch('1')).toBe('1');
        expect(escapeStringSwitch(' ')).toBe(' ');
    });

    it("should handle mixed strings", () => {
        expect(escapeStringSwitch('Line1\nLine2\tTabbed\\Backslash')).toBe('Line1\\nLine2\\tTabbed\\\\Backslash');
    });
});
