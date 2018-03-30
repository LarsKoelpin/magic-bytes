module.exports = {
    entry: "./src/index.js",
    output: {
      path: __dirname + '/dist',
      filename: 'browser.js',
      library: 'magic-bytes.js',
      libraryTarget: 'window'
    },
    module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
              loader: 'babel-loader',
            }
          }
        ]
      }
};