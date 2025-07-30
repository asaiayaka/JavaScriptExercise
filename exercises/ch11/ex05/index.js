export function detectFileType(buffer) {
  // Uint8Arrayに変換して、バイト単位でチェックできるようにする
  const bytes = new Uint8Array(buffer);

  // PDF：先頭が[0x25, 0x50, 0x44, 0x46] → "%PDF"
  if (
    bytes[0] === 0x25 &&
    bytes[1] === 0x50 &&
    bytes[2] === 0x44 &&
    bytes[3] === 0x46
  ) {
    return "PDF";
  }

  // ZIP：以下のいずれかの先頭パターンに一致
  const zipSignatures = [
    [0x50, 0x4b, 0x03, 0x04], // common .zip file
    [0x50, 0x4b, 0x05, 0x06], // empty archive
    [0x50, 0x4b, 0x07, 0x08], // spanned archive
  ];
  for (const sig of zipSignatures) {
    let match = true;
    for (let i = 0; i < sig.length; i++) {
      if (bytes[i] !== sig[i]) {
        match = false;
        break;
      }
    }
    if (match) {
      return "ZIP";
    }
  }

  // GIF："GIF87a"または"GIF89a"に一致するか
  if (
    bytes[0] === 0x47 && // G
    bytes[1] === 0x49 && // I
    bytes[2] === 0x46 && // F
    bytes[3] === 0x38 && // 8
    (bytes[4] === 0x37 || bytes[4] === 0x39) && // 7 or 9
    bytes[5] === 0x61 // a
  ) {
    return "GIF";
  }

  // PNG：固定の8バイトヘッダーに一致
  const pngSignature = [
    0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a,
  ];
  let isPng = true;
  for (let i = 0; i < pngSignature.length; i++) {
    if (bytes[i] !== pngSignature[i]) {
      isPng = false;
      break;
    }
  }
  if (isPng) {
    return "PNG";
  }

  // 上記のいずれにも該当しなければUNKNOWNを返す
  return "UNKNOWN";
}
