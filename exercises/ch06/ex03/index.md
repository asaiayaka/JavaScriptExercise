# プロトタイプチェーン図

## o, p, q

let o = {};
let p = Object.create(o);
let q = Object.create(p);

### qのプロトタイプチェーン

q -> p -> o -> Object.prototype -> null

### pのプロトタイプチェーン

p -> o -> Object.prototype -> null

### oのプロトタイプチェーン

o -> Object.prototype -> null

### Objectのプロトタイプチェーン

let obj = {};

obj -> Object.prototype -> null

### Arrayのプロトタイプチェーン

let arr = {};

arr -> Array.prototype -> Object.prototype -> null

### Dateのプロトタイプチェーン

let date = new Date();

date -> Date.prototype -> Object.prototype -> null

### Mapのプロトタイプチェーン

let map = new Map();

map -> Map.prototype -> Object.prototype -> null
