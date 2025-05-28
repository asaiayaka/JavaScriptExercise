// オブジェクトの直接のownKeysのみを収集する関数
function getAllKeys(obj) {
  const keys = new Set();
  // nullやundefinedの場合は空のSetを返す
  if (!obj) {
    return keys;
  }
  
  // プロトタイプチェーンを辿らず、直接のownKeysのみを収集
  Reflect.ownKeys(obj).forEach((k) => keys.add(k));
  return keys;
}

export function restrict(target, template) {
  const keepKeys = getAllKeys(template);
  
  for (const key of Reflect.ownKeys(target)) {
    // テンプレートにないキーを削除する
    // ただし、Symbolキーはテンプレートにない場合でも保持する
    if (!keepKeys.has(key) && typeof key !== 'symbol') {
      delete target[key];
    }
  }
  return target;
}

export function substract(target, ...sources) {
  const removeKeys = new Set();
  
  // 削除すべきキーを収集
  for (const source of sources) {
    if (source) {
      for (const key of getAllKeys(source)) {
        removeKeys.add(key);
      }
    }
  }
  
  for (const key of Reflect.ownKeys(target)) {
    // 削除対象のキーかつSymbolでない場合のみ削除
    if (removeKeys.has(key) && typeof key !== 'symbol') {
      delete target[key];
    }
  }
  return target;
}