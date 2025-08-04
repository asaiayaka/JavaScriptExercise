import { jest } from '@jest/globals';
import { retryWithExponentialBackoff } from "./index";

describe("retryWithExponentialBackoff", () => {
  // 各テストの前にタイマーのモックを有効化
  beforeEach(() => {
    jest.useFakeTimers();
    jest.clearAllTimers(); // タイマーが他のテストに影響しないように
  });
  it("funcが最初に成功した場合、即座にcallback(true)が呼ばれる", () => {
    const func = jest.fn(() => true);
    const callback = jest.fn();

    retryWithExponentialBackoff(func, 3, callback);

    // setTimeout(0)後に即座に実行される
    jest.runOnlyPendingTimers();

    expect(func).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(true);
  });

  it("funcが失敗し続けた場合、maxRetry回でcallback(false)が呼ばれる", () => {
    const func = jest.fn(() => false);
    const callback = jest.fn();

    retryWithExponentialBackoff(func, 3, callback);

    // setTimeout(0)を実行
    jest.runOnlyPendingTimers();

    // 1回目：delayなし
    expect(func).toHaveBeenCalledTimes(1);

    // 2回目：1秒後
    jest.advanceTimersByTime(1000);
    expect(func).toHaveBeenCalledTimes(2);

    // 3回目：2秒後
    jest.advanceTimersByTime(2000);
    expect(func).toHaveBeenCalledTimes(3);

    // maxRetry=3なので終了
    expect(callback).toHaveBeenCalledWith(false);
  });

  it("funcが2回目で成功した場合、その時点でcallback(true)が呼ばれる", () => {
    const func = jest
      .fn()
      .mockReturnValueOnce(false) // 1回目：false
      .mockReturnValueOnce(true); // 2回目：true
    const callback = jest.fn();

    retryWithExponentialBackoff(func, 5, callback);

    jest.runOnlyPendingTimers(); // 最初の呼び出し
    expect(func).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(1000); // 1秒後に2回目
    expect(func).toHaveBeenCalledTimes(2);

    expect(callback).toHaveBeenCalledWith(true);
  });

  it("待ち時間が指数的に増えていく", () => {
    const func = jest.fn(() => false);
    const callback = jest.fn();

    retryWithExponentialBackoff(func, 4, callback);
    jest.runOnlyPendingTimers(); // 最初の呼び出し
    expect(func).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(1000); // 1秒 → 2回目
    expect(func).toHaveBeenCalledTimes(2);

    jest.advanceTimersByTime(2000); // 2秒 → 3回目
    expect(func).toHaveBeenCalledTimes(3);

    jest.advanceTimersByTime(4000); // 4秒 → 4回目
    expect(func).toHaveBeenCalledTimes(4);

    expect(callback).toHaveBeenCalledWith(false);
  });
});
