describe("emoji test", () => {
    const emoji = "💯";
    const utf16 = "\uD83D\uDCAF";
    const utf32 = "\u{0001F4AF}";

    // emojiの長さが2であるかどうか確認するテスト
    test("length 2", () => {
        expect(emoji.length).toBe(2);
    });

    // emojiとutf16が同じか確認するテスト
    test("utf16 equals emoji", () => {
        expect(emoji).toBe(utf16);
    });

    // emojiとutf32が同じか確認するテスト
    test("utf32 equals emoji", () => {
        expect(emoji).toBe(utf32);
    });
})

