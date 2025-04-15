// できていない
export function slice(str, indexStart, indexEnd) {
  const len = str.length;

  // indexStart, indexEndがundefinedの場合はデフォルト値を設定
  if (indexStart === undefined) {
    indexStart = 0;  // indexStartがundefinedの場合、0を設定
  }
  if (indexEnd === undefined) {
    indexEnd = len;  // indexEndがundefinedの場合、str.lengthを設定
  }

  // indexStart, indexEndがNaNの場合、空文字を返す
  if (isNaN(indexStart) || isNaN(indexEnd)) {
    return "";
  }

  // NaNや小数を対処
  indexStart = Math.trunc(indexStart ?? 0); // indexStartがNanの場合は0を設定(??の意味)
  indexEnd = Math.trunc(indexEnd ?? len); // indexEndがNaNの場合はstrの長さを設定

  // マルチインデックスを対応(末尾から数える)
  if (indexStart < 0) {
    indexStart = Math.max(len + indexStart, 0); // indexEndが負なら末尾から計算。len + indexStartか0か大きい方の値を返す
  } else { 
    indexStart = Math.min(indexStart, len); // indexStartがlenより大きくならないように
  }
  if (indexEnd < 0) {
    indexEnd = Math.max(len + indexEnd, 0); // indexEndが負なら末尾から計算
  } else {
    indexEnd = Math.min(indexEnd, len); // indexEndがlenより大きくならないように
  }

  // 開始位置>終了位置なら空文字列
  if (indexEnd <= indexStart) {
    return "";
  }

  // str.sliceのように文字列を抽出する処理
  let result = "";
  for (let i = indexStart; i < indexEnd; i++) {
    result += str[i]; // indexStartからindexEndの範囲で文字を追加
  }

  return result; // 結果の文字列を返す
}
