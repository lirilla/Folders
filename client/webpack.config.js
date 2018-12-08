const HtmlWebPackPlugin = require("html-webpack-plugin");
module.exports = {
  output: {
    publicPath: '/'
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
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
              modules: true,
              localIdentName: "[local]___[hash:base64:5]"
            }
          },
          {
            loader: "less-loader"
          }
        ]
      }
    ]
  },
  devServer: {
      proxy: [{
            path: '/api/',
            target: 'http://localhost:3001'
        }, {
          path: '/uploads/',
          target: 'http://localhost:3001'
        }
      ],
      historyApiFallback: true
  },
  
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    })
  ]
};