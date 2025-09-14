import { retryWithExponentialBackoff } from ".";
import { jest } from "@jest/globals";


describe("retryWithExponentialBackoff", () => {
    jest.setTimeout(15000); // テストが待機時間を含むため余裕を持たせる

    test("成功する場合はすぐに結果を返す", async () => {
        const func = jest.fn().mockResolvedValue("ok");

        const result = await retryWithExponentialBackoff(func, 3);

        expect(result).toBe("ok");
        expect(func).toHaveBeenCalledTimes(1); // 一発成功
    });

    test("失敗時にリトライして成功する", async () => {
        const func = jest
            .fn()
            .mockRejectedValueOnce(new Error("first fail"))
            .mockRejectedValueOnce(new Error("second fail"))
            .mockResolvedValue("success");

        const result = await retryWithExponentialBackoff(func, 5);

        expect(result).toBe("success");
        expect(func).toHaveBeenCalledTimes(3); // 3回目で成功
    });

    test("最大リトライ回数を超えて失敗した場合はrejectする", async () => {
        const func = jest.fn().mockRejectedValue(new Error("always fail"));

        await expect(retryWithExponentialBackoff(func, 3)).rejects.toThrow("always fail");
        expect(func).toHaveBeenCalledTimes(3);
    })
})