const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: "./src/index.js",
  mode: "development",
  devServer: {
    static: {
      directory: path.join(__dirname, "public"),
    },
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin(),
    new webpack.DefinePlugin({
      "process.env.WEATHER_API_KEY": JSON.stringify(
        "process.env.WEATHER_API_KEY"
      ),
    }),
  ],
};
