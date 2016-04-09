import path from 'path'
import WebpackDevServer from 'webpack-dev-server'
import webpack from 'webpack'
import webpackConfig from '../../webpack.config'
import chalk from 'chalk'
const compiler = webpack(webpackConfig)

const relayServer = new WebpackDevServer(compiler, {
  contentBase: path.join(__dirname, '../../build'),
  proxy: {
    '/graphql': 'http://localhost:8000'
  },
  stats: {
    colors: true
  }
})

relayServer.listen(3000, () => console.log(chalk.green('listening 3000')))
