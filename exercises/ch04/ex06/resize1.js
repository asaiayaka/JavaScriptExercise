// 何らかのリサイズを行う関数と思って読んで下さい
//
// - params には undefined またはオブジェクトが与えられる
// - params.maxWidth が与えられる場合 (正の整数と仮定して良い) はその値を利用する
// - params.maxHeight が与えられる場合 (正の整数と仮定して良い) はその値を利用する
function resize1(params) {
    let maxWidth = (params && params.maxWidth) || 600; // paramsが存在していればその中のmaxWidthを使う。もし存在していない場合は600
    let maxHeight = (params && params.maxHeight) || 480; // paramsが存在していればその中のmaxHeightを使う。もし存在していない場合は480
  
    console.log({ maxWidth, maxHeight });
  }
  