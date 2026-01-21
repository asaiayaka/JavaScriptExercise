// Github API通信用の共通関数
// fetchを注入可能にすることでテストしやすくする
export function createGithubClient({ token, fetchFn, verbose = false }) {
    if (!token) {
        throw new Error("GITHUB_TOKENが設定されていません");
    }

    return async function githubRequest(method, url, body) {
        const headers = {
            Accept: "application/vnd.github+json",
            Authorization: `Bearer ${token}`,
            "X-Github-Api-Version": "2022-11-28",
        };

        if (body) {
            headers["Content-Type"] = "application/json";
        }

        if (verbose) {
            console.log("HTTP:", method, url);
        }

        const res = await fetchFn(url, {
            method,
            headers,
            body: body ? JSON.stringify(body) : undefined,
        });

        const text = await res.text();

        if (!res.ok) {
            throw new Error(`Github API Error: ${res.status} ${text}`);
        }

        return text ? JSON.parse(text) : null;
    };
}