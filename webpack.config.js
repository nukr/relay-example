import path from 'path'

export default {
  entry: './client/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js'
  },
  devtool: 'eval',
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel' }
    ]
  },
  resolve: {
    extensions: ['', '.react.js', '.js']
  }
}
