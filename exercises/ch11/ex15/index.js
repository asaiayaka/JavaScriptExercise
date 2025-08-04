/**
 * 与えられたbase URLに対して、オプションでパスやクエリを追加して修正したURL文字列を返す関数
 * 
 * @param {Object} params - URL修正に使う情報をまとめたオブジェクト
 * @param {string} params.base - ベースとなるURL
 * @param {string} [params.path] - 新しく設定するパス(相対でも可)
 * @param {Array<Array<string>>} [params.addQuery] - クエリとして追加するkey-valueの配列
 * @returns {string} - 修正後のURL文字列
 */
export function modifyUrl({base, path, addQuery} = {}) {
    let url;

    try {
        // URLオブジェクトとしてパースできるか確認(無効なURLならエラー)
        url = new URL(base);
    } catch (e) {
        throw new Error("Invalid base URL");
    }

    // パスの置き換え(相対パスとして扱う)
    if (typeof path === "string") {
        // 現在のパス部分を無視して新しい相対パスで上書き
        const newPath = new URL(path, url); // 第二引数に元のURLを与えることで相対解決
        url.pathname = newPath.pathname;
    }

    // クエリパラメータの追加
    if (Array.isArray(addQuery)) {
        for (const [key, value] of addQuery) {
            url.searchParams.append(key, value);
        }
    }

    return url.toString();
} 