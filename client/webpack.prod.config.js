const Path = require("path");
const webpack = require("webpack");
const HtmlWebpack = require("html-webpack-plugin");
const dotenv = require("dotenv");

module.exports = () => {
  let env = dotenv.config({
    path: Path.join(__dirname, "/") + ".env",
  }).parsed;
  if (!env) {
    env = dotenv.config({
      path: Path.join(__dirname, "../") + ".env.example",
    }).parsed;
  }
  const envKeys = Object.keys(env).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(env[next]);
    return prev;
  }, {});

  return {
    entry: "./src/index.tsx",
    resolve: {
      extensions: [".tsx", ".js"],
    },
    output: {
      path: Path.resolve(__dirname, "dist"),
      filename: "index_bundle.js",
      publicPath: "",
    },
    module: {
      rules: [
        { test: /\.(js)$/, use: "babel-loader" },
        { test: /\.(css)$/, use: ["style-loader", "css-loader"] },
        {
          test: /\.(png|jpg)$/i,
          use: [
            {
              loader: "url-loader",
              options: {
                limit: 8192,
              },
            },
          ],
        },
        {
          test: /\.svg$/,
          use: ["babel-loader", "react-svg-loader"],
        },
        {
          test: /\.(tsx)$/,
          use: {
            loader: "babel-loader",
            options: {
              presets: [
                "@babel/preset-env",
                [
                  "@babel/preset-typescript",
                  {
                    runtime: "automatic",
                  },
                ],
              ],
            },
          },
        },
      ],
    },
    mode: "production",
    plugins: [
      new HtmlWebpack({
        template: "./public/index.html",
      }),
      new webpack.DefinePlugin(envKeys),
    ],
  };
};
