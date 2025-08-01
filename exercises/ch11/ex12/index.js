class FileSizeLimitError extends Error {
    constructor(filePath, size, maxSize) {
        // エラーメッセージを作成して親クラスに渡す
        super(`ファイル "${filePath}" のサイズ ${size} バイトは、許容上限 ${maxSize} バイトを超えています。`);

        // エラーのプロパティを保持
        this.filePath = filePath;
        this.size = size;
        this.maxSize = maxSize;
    }

    // エラー名を独自のものに変更(デフォルトは"Error")
    get name() {
        return "FileSizeLimitError";
    }
}