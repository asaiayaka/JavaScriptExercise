function fSafe(input) {
    // 入力をプレーンな文字列として扱う(コードではなく値)
    const sanitized = String(input).replace(/"/g, '\\"'); // ダブルクオートをエスケープ。/"/g：文字列中のすべての " を検索。'\\\"'："\"" → エスケープされたダブルクォート。.replace(/"/g, '\\"')：すべての " を \" に変換して安全化
    console.log(`Hello, "${sanitized}"`);
}

fSafe('World');
fSafe('"; process.exit();');