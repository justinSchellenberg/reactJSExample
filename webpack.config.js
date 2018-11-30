const path = require('path');

module.exports = {
  entry: {
    BMS_React_Hello_World: './builds/BMS_React_Hello_World.js'
    //BMS_some_Other_module: './builds/BMS_some_Other_module.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader', 'postcss-loader'],
      }
    ]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js', '.jsx' ]
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, '../assets')
  }
};
