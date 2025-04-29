export function escapeStringSwitch(str) {
    let result = "";

    for (let i=0; i < str.length; i++) {
        let ch = str[i];
        switch (ch) {
            case '\0':
                result += '\\0';
                break;
                case '\b':
                    result += '\\b';
                    break;
                case '\t':
                    result += '\\t';
                    break;
                case '\n':
                    result += '\\n';
                    break;
                case '\v':
                    result += '\\v';
                    break;
                case '\f':
                    result += '\\f';
                    break;
                case '\r':
                    result += '\\r';
                    break;
                case '"':
                    result += '\\"';
                    break;
                case '\'':
                    result += '\\\'';
                    break;
                case '\\':
                    result += '\\\\';
                    break;
                default:
                    result += ch;
                    break;
        }
    }
    return result;
}