const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

/** @type {import('webpack').Configuration} */
module.exports = {
  mode: "development",
  entry: path.join(__dirname, "src", "index.js"),
  output: {
    path: path.join(__dirname, "dist"),
    filename: "index.js",
  },
  devServer: {
    static: "./dist",
    port: 9000,
    historyApiFallback: {
      index: "dist/index.html",
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Gradient descent generator - example",
    }),
  ],
};
