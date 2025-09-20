// 文字列を正規表現リテラル用にエスケープするユーティリティー
function escapeRegExpLiteral(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// Unicode正規表現（NFD）して合成ダイアクリティカルマークを除去
function normalizeAndStripDiacritics(input) {
    return input.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

export class IgnoreAccentPattern {
    constructor(pattern) {
        if (pattern instanceof RegExp) {
            // RegExpの場合はsourceとflagsを利用
            this._flags = pattern.flags;
            this._rawSource = pattern.source;
        } else {
            // 文字列の場合は正規表現のリテラルとして扱う
            this._flags = "";
            this._rawSource = escapeRegExpLiteral(String(pattern));
        }

        // パターン自体も正規化・合成マーク除去して保持
        const normalizedSource = normalizeAndStripDiacritics(this._rawSource);

        this._re = new RegExp(normalizedSource, this._flags);
    }

    // String.prototype.searchから呼ばれる
    [Symbol.search](text) {
        const normalized = normalizeAndStripDiacritics(String(text));
        return this._re[Symbol.search](normalized);
    }

    // String.prototype.matchから呼ばれる
    [Symbol.match](text) {
        const normalized = normalizeAndStripDiacritics(String(text));
        return this._re[Symbol.match](normalized);
    }
}