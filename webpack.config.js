const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const webpack = require("webpack");
const Dotenv = require("dotenv-webpack");
const dotenv = require("dotenv").config();

class LogEnvVariablesPlugin {
  apply(compiler) {
    compiler.hooks.beforeRun.tap("LogEnvVariablesPlugin", () => {
      console.log("Environment variables:", process.env);
    });
  }
}

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
    new Dotenv(),
    new webpack.EnvironmentPlugin(["WEATHER_API_KEY"]),

    new LogEnvVariablesPlugin(), // Log process.env during webpack build
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "img/", // Output folder for images
              publicPath: "img/", // Public path to access images
            },
          },
        ],
      },
    ],
  },
};
