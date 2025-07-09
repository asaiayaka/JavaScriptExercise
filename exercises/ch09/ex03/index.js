export function PositiveNumber(x) {
    if (x <= 0) {
        throw new Error("require: x > 0");
    }

    // xはこの関数スコープに中に閉じ込められていて、外部から直接アクセスできない
    let value = x;

    return {
        getX: function() {
            return value;
        },
        setX: function(newX) {
            if (newX <= 0) {
                throw new Error("require: x > 0");
            }
            value = newX;
        }
    };
}