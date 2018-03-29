module.exports = {
    entry: "./src/index.js",
    output: {
      path: __dirname + '/dist',
      filename: 'bundle.js'
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