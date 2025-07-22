const path = require('path');

module.exports = {
  entry: './ch10/ex01/index.cjs',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'ch10/ex01/dist'),
  },
  resolve: {
    extensions: ['.cjs', '.js'], // ここで .cjs を有効にする
  },
  mode: 'none',
};
