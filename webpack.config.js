module.exports = {
  entry: './examples/index.js',

  output: {
    filename: 'bundle.js',
    path: 'examples/'
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015']
        }
      },
      {
        test: /\.css$/,
        loader: 'style!css'
      }
    ]
  }
};
