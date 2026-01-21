// Issues操作をまとめたライブラリ
// githubRequestを外から受け取ることでモック可能にする
export async function listOpenIssues(githubRequest, owner, repo) {
    if (!owner || !repo) {
        throw new Error("ownerとrepoが必要です");
    }

    const url = `https://api.github.com/repos/${owner}/${repo}/issues?state=open`;
    const issues = await githubRequest("GET", url);

    // Pull Requestを除外
    return issues.filter(issue => !issue.pull_request);
}

export async function createIssue(githubRequest, owner, repo, title, body = "") {
    if (!owner || !repo || !title) {
        throw new Error("titleが必要です");
    }

    const url = `https://api.github.com/repos/${owner}/${repo}/issues`;

    return githubRequest("POST", url, { title, body });
}

export async function closeIssue(githubRequest, owner, repo, issueNumber) {
    if (!owner || !repo || !issueNumber) {
        throw new Error("issue_numberが必要です");
    }

    const url = `https://api.github.com/repos/${owner}/${repo}/issues/${issueNumber}`;

    return githubRequest("PATCH", url, { state: "closed" });
}