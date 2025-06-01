export function createPolarPoint(r = 0, theta = 0) {
    // 内部状態としてのr(距離)とtheta(角度)
    let _r = r;
    let _theta = theta;

    // x座標を計算(x = r * cos(theta))
    const getX = () => _r * Math.cos(_theta);
    // x座標を設定し、それに応じてrとthetaを再計算
    const setX = (value) => {
        if (isNaN(value)) {
            throw new Error("xにNaNを設定することはできません");
        }
        const y = getY(); // 現在のy値を取得
        _r = Math.sqrt(value * value + y * y); // 新しいrを計算
        _theta = Math.atan2(y, value); // 新しいthetaを計算
    };

    // y座標を計算(y = r * sin(theta))
    const getY = () => _r * Math.sin(_theta);

    // y座標を設定し、それに応じてrとthetaを再計算
    const setY = (value) => {
        if (isNaN(value)) {
            throw new Error("yにNaNを設定することはできません");
        }
        const x = getX(); // 現在のx値を取得
        _r = Math.sqrt(x * x + value * value); // 新しいrを計算
        _theta = Math.atan2(value, x); // 新しいthetaを計算
    };

    return {
        get r() {return _r;},
        set r(value) { _r = value;},

        get theta() {return _theta;},
        set theta(value) {_theta = value;},

        get x() {return getX();},
        set x(value) {setX(value);},

        get y() {return getY();},
        set y(value) {setY(value);}
    };
}