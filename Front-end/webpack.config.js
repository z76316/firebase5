const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require('path');

module.exports = {
  entry: './src/index.js',
  devtool: 'inline-source-map',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist') 
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    })
  ],
  devServer: {
    historyApiFallback: true,
    overlay: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader']
      },
      { 
        test: /\.css$/, 
        loader: "style-loader!css-loader" 
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      },
      {
        test: /\.(jpg|png|gif|svg|pdf|ico)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
                name: '[path][name]-[hash:8].[ext]'
            }
          }
        ]
      }
    ]
  }
};