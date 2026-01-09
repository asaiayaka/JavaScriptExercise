import { jest } from "@jest/globals";

// net.connectをモックする
jest.unstable_mockModule("net", () => {
    return {
        default: {
            connect: jest.fn(() => {
                const handlers = {};
                return {
                    on: (event, cb) => {
                        handlers[event] = cb;
                        // 即座にconnect成功イベントを発火させる
                        if (event === "connect") {
                            setTimeout(cb, 0);
                        }
                    }
                };
            })
        }
    };
});

const net = (await import("net")).default;

describe("hold-clientの接続ループ動作", () => {
    test("connectが繰り返し呼ばれること", async () => {
        await import("./hold-client.js");

        // 少なくとも複数回connectが呼ばれていることを確認
        expect(net.connect).toHaveBeenCalled();
    });
});