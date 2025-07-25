// f はオブジェクトを1つ引数に取る関数
export function cache(f) {
  // この関数を実装する
  // WeakMapを使ってキャッシュ。キーはオブジェクト。
  const weakMap = new WeakMap();

  return function(obj) {
    // キャッシュにある場合はそれを返す
    if (weakMap.has(obj)) {
      return weakMap.get(obj);
    }

    // なければslowFnを実行し、結果をキャッシュ
    const result = f(obj);
    weakMap.set(obj, result);
    return result;
  };
}

export function slowFn(obj) {
  // 時間のかかる処理
  let sum = 0;
  for (let i = 0; i < 1e6; i++) {
    sum += (obj.value || 0);
  }
  return sum;
}

// cachedSlowFnを同じ引数で複数回呼び出すと、2回目以降はキャッシュが返る
const cachedSlowFn = cache(slowFn);
