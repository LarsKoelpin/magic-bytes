module.exports = {
  mode: "production",
  entry: "./src/index.ts",
  output: {
    path: __dirname + "/dist",
    filename: "browser.js",
    library: {
      name: "magic-bytes.js",
      type: "window",
    },
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
};
