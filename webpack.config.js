const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

module.exports = {
  mode: "production",
  entry: {
    index: "./src/index.js",
  },
  devtool: "inline-source-map",
  devServer: {
    static: "./dist",
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Weather",
      template: "./src/index.html",
    }),
    new MiniCssExtractPlugin(),
    new NodePolyfillPlugin(),
  ],
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "./dist"),
    clean: true,
  },
  optimization: {
    minimize: true,
    runtimeChunk: "single",
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: "raw-loader",
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(?:js|mjs|cjs)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env", { targets: "defaults" }]],
          },
        },
      },
    ],
  },
};
