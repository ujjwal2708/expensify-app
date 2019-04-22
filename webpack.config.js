// entry --> output
const path = require("path");

module.exports = {
  entry: "./src/app.js",
  output: {
    path: path.join(__dirname, "public"), // needs to be a absolute path
    filename: "bundle.js"
  },

  module: {
    rules: [
      {
        loader: "babel-loader",
        test: /\.js$/,
        exclude: /node_modules/
      },
      {
        test: /\.s?css$/,
        use: ["style-loader", "css-loader", "sass-loader"]
      }
    ]
  },

  mode: "none",

  devtool: "cheap-module-eval-source-map", // helps in faster debugging

  devServer: {
    contentBase: path.join(__dirname, "public"),
    historyApiFallback: true
  }
};
