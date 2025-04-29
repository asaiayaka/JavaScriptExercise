export function escapeStringIfElse(str) {
    let result = "";
    for (let i = 0; i < str.length; i++) {
        let ch = str[i];
        if (ch === '\0') {
            result += '\\0';
        } else if (ch === '\b') {
            result += '\\b';
        } else if (ch === '\t') {
            result += '\\t';
        } else if (ch === '\n') {
            result += '\\n';
        } else if (ch === '\v') {
            result += '\\v';
        } else if (ch === '\f') {
            result += '\\f';
        } else if (ch === '\r') {
            result += '\\r';
        } else if (ch === '"') {
            result += '\\"';
        } else if (ch === '\'') {
            result += '\\\'';
        } else if (ch === '\\') {
            result += '\\\\';
        } else {
            result += ch;
        }
    }
    return result;
}
