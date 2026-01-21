import { Polly } from "@pollyjs/core";
import FetchAdapter from "@pollyjs/adapter-fetch";
import FSPersister from "@pollyjs/persister-fs";

import { createGithubClient } from "./index.js";
import { listOpenIssues } from "./issues.js";

// Pollyにadapter / persisterを登録
Polly.register(FetchAdapter);
Polly.register(FSPersister);

describe("Issueライブラリ（Polly.JS版）", () => {
    let polly;
    let githubRequest;

    beforeAll(() => {
        polly = new Polly("github-issues-test", {
            adapters: ["fetch"],
            persister: "fs",
            persisterOptions: {
                fs: {
                    recordingsDir: "__recordings__",
                },
            },
            recordIfMissing: true, // 初回のみ実通信
        });

        githubRequest = createGithubClient({
            token: process.env.GITHUB_TOKEN,
            fetchFn: fetch,
        });
    });

    afterAll(async () => {
        await polly.stop();
    });

    test("GitHub APIのレスポンスを記録・再生できる", async () => {
        const issues = await listOpenIssues(
            githubRequest,
            "octocat",
            "Hello-World",
        );

        expect(Array.isArray(issues)).toBe(true);
    });
});