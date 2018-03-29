module.exports = {
    entry: "./src/index.js",
    output: {
      path: __dirname + '/dist',
      filename: 'bundle.js',
      library: 'magic-bytes.js',
      libraryTarget: 'commonjs-module'
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