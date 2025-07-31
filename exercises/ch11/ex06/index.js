/**
 * メールアドレスが有効かどうかをチェックする関数
 * dot-atom形式のみ対応
 * 特殊文字を含まない(quoted-stringやコメントはサポートしない)
 * ローカル部は最大64文字
 * @param email 判定対象の文字列
 * @return 有効なメールアドレスなら true、そうでなければ false
 */
export function isEmailAddress(email) {
    if (typeof email !== 'string') return false;

    // 全体の長さ制限（local@domain含めて254文字まで）
    if (email.length > 254) return false;

    // ASCIIのみ
    if (/[^\u0020-\u007E]/.test(email)) return false;

    const atIndex = email.indexOf('@');
    if (atIndex === -1 || email.indexOf('@', atIndex + 1) !== -1) return false;

    const local = email.slice(0, atIndex);
    const domain = email.slice(atIndex + 1);

    if (local.length === 0 || local.length > 64) return false;
    if (domain.length === 0 || domain.length > 255) return false;

    const disallowedChars = /[()<>[\]:;@\\,",\s]/;
    if (disallowedChars.test(local) || disallowedChars.test(domain)) return false;

    const dotInvalid = /(\.\.)|(^\.)|(\.$)/;
    if (dotInvalid.test(local) || dotInvalid.test(domain)) return false;

    return true;
}
