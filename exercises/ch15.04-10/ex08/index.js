// SVG 内の時計の中心座標を取得
const svg = document.querySelector('svg');
const cx = svg.viewBox.baseVal.width / 2;
const cy = svg.viewBox.baseVal.height / 2;

// 秒針を作成
const secondHand = document.createElementNS("http://www.w3.org/2000/svg", "line");
secondHand.setAttribute("x1", cx);
secondHand.setAttribute("y1", cy);
secondHand.setAttribute("x2", cx);
secondHand.setAttribute("y2", cy - (cy * 0.9)); // 秒針の長さ
secondHand.setAttribute("stroke", "red");
secondHand.setAttribute("stroke-width", "2");
secondHand.setAttribute("stroke-linecap", "round");

// SVG に追加
svg.appendChild(secondHand);

// 秒針を回す関数
function updateSecondHand() {
    const now = new Date();
    const seconds = now.getSeconds() + now.getMilliseconds() / 1000;
    const angle = (seconds / 60) * 360;
    secondHand.setAttribute("transform", `rotate(${angle} ${cx} ${cy})`);
    requestAnimationFrame(updateSecondHand);
}

// 秒針のアニメーション開始
updateSecondHand();
