import { jest, describe, test, expect, beforeEach } from "@jest/globals";
import {listOpenIssues,
  createIssue,
  closeIssue,
} from "./issues.js";

describe("Issue ライブラリ(Jestモック版)", () => {
    // githubRequestをJestモック関数として作成
    let mockGithubRequest;

    beforeEach(() => {
        mockGithubRequest = jest.fn();
    });

    test("openなIssue一覧を取得できる", async () => {
        mockGithubRequest.mockResolvedValue([
            { number: 1, title: "Issue 1" },
            { number: 2, title: "PR", pull_request: {} },
        ]);

        const issues = await listOpenIssues(
            mockGithubRequest,
            "owner",
            "repo"
        );

        expect(issues).toHaveLength(1);
        expect(issues[0].title).toBe("Issue 1");
    });

    test("Issueを作成できる", async () => {
        mockGithubRequest.mockResolvedValue({
            number: 10,
            title: "新しい Issue",
        });

        const result = await createIssue(
            mockGithubRequest,
            "owner",
            "repo",
            "新しい Issue",
            "本文"
        );

        expect(mockGithubRequest).toHaveBeenCalledWith(
            "POST",
            "https://api.github.com/repos/owner/repo/issues",
            { title: "新しい Issue", body: "本文" }
        );
        expect(result.number).toBe(10);
    });

    test("Issueをクローズできる", async () => {
        mockGithubRequest.mockResolvedValue({
            number: 5,
            title: "クローズ対象",
            state: "closed",
        });

        const result = await closeIssue(
            mockGithubRequest,
            "owner",
            "repo",
            5
        );

        expect(result.state).toBe("closed");
    });
});