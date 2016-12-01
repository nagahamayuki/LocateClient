const path = require('path');
module.exports = {
  entry: "./src/reactapp.jsx",
  output: {
    filename: './src/bundle.js'
  },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: {
          plugins: ["transform-react-jsx"]
        }
      }
    ]
  }
};
