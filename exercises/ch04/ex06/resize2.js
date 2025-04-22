// 何らかのリサイズを行う関数と思って読んで下さい
//
// - params には undefined またはオブジェクトが与えられる
// - params.maxWidth が与えられる場合 (正の整数と仮定して良い) はその値を利用する
// - params.maxHeight が与えられる場合 (正の整数と仮定して良い) はその値を利用する
function resize(params) {
    let maxWidth = params?.maxWidth ?? 600; // paramsがundefinedでも次の処理に進む。undefinedかnullの場合は600
    let maxHeight = params?.maxHeight ?? 480; // paramsがundefinedでも次の処理に進む。undefinedかnullの場合は480

    console.log({ maxWidth, maxHeight });
  }
  