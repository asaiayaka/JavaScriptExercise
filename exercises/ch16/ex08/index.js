#!/usr/bin/env node
import process from "process";

const args = process.argv.slice(2);

// オプション解析
let verbose = false;

const filteredArgs = [];
for (const a of args) {
  if (a === "-h" || a === "--help") {
    printHelp();
    process.exit(0);
  } else if (a === "-v" || a === "--verbose") {
    verbose = true;
  } else {
    filteredArgs.push(a);
  }
}

// コマンド判定
const [command, owner, repo, ...rest] = filteredArgs;

if (!command) {
  printHelp();
  process.exit(1);
}

// Github Token確認
const token = process.env.GITHUB_TOKEN;
if (!token) {
  console.error("GITHUB_TOKENが設定されていません。");
  process.exit(1);
}

// API共通処理
async function githubRequest(method, url, body) {
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
    if (body) {
      console.log("BODY:", body);
    }
  }

  const res = await fetch(url, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  const text = await res.text();

  if (verbose) {
    console.log("STATUS:", res.status);
    console.log("RESPONSE:", text);
  }

  if (!res.ok) {
    throw new Error(`Github API Error: ${res.status} ${text}`);
  }

  return text ? JSON.parse(text) : null;
}

// コマンド実装
try {
  if (command === "list") {
    // openなIssueの一覧を表示
    if (!owner || !repo) {
      throw new Error("ownerとrepoが必要です");
    }
    const url = `https://api.github.com/repos/${owner}/${repo}/issues?state=open`;
    const issues = await githubRequest("GET", url);

    for (const issue of issues) {
      // PullRequestもIssue APIに混ざるため除外
      if (!issue.pull_request) {
        console.log(`#${issue.number}: ${issue.title}`);
      }
    }
  } else if (command === "create") {
    // Issueを作成
    if (!owner || !repo || rest.length < 1) {
      throw new Error("titleが必要です");
    }

    const [title, body = ""] = rest;

    const url = `https://api.github.com/repos/${owner}/${repo}/issues`;

    const result = await githubRequest("POST", url, {
      title,
      body,
    });

    console.log("Issue作成完了：");
    console.log(`#${result.number}: ${result.title}`);
  } else if (command === "close") {
    // Issueをクローズ
    if (!owner || !repo || rest.length < 1) {
      throw new Error("issue_numberが必要です");
    }

    const issueNumber = rest[0];

    const url = `https://api.github.com/repos/${owner}/${repo}/issues/${issueNumber}`;

    const result = await githubRequest("PATCH", url, {
      state: "closed",
    });

    console.log("Issue クローズ完了：");
    console.log(`#${result.number}: ${result.title}`);
  } else {
    throw new Error("不明なコマンドです");
  }
} catch (err) {
  console.error("エラー：", err.message);
  process.exit(1);
}

// ヘルプ表示
function printHelp() {
  console.log(`
            使い方：
                node index.js [options] <command> ...
            
            コマンド：
                list <owner> <repo>
                    OpenなIssueの一覧を表示
                create <owner> <repo> <title> [body]
                    Issueを作成
                close <owner> <repo> <issue_number>
                    Issueをクローズ
            オプション：
                -h, --help
                    このヘルプを表示
                
                -v, --verbose
                    HTTP通信ログを表示

            事前準備：
                環境変数 GITHUB_TOKENにGithub Personal Access Tokenを設定する
        `);
}
