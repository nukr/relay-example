import chokidar from 'chokidar'
import { spawn } from 'child_process'

function spawnServer () {
  return spawn('node', ['server/'], {stdio: 'inherit'})
}

function spawnDevServer () {
  return spawn('node', ['server/dev-server'], {stdio: 'inherit'})
}

let server = spawnServer()
let devServer = spawnDevServer()

chokidar.watch('./server', {
  ignored: [/[\/\\]\./, /\/data\//],
  ignoreInitial: true
}).on('change', restartServer)
  .on('add', restartServer)
  .on('addDir', restartServer)
  .on('unlink', restartServer)
  .on('unlinkDir', restartServer)

chokidar.watch('./server/data', {
  ignored: [/[\/\\]\./, /schema\.json/],
  ignoreInitial: true
}).on('change', () => {
  if (devServer) devServer.kill('SIGKILL')
  devServer = spawnDevServer()
})

function restartServer () {
  if (server) server.kill('SIGKILL')
  server = spawnServer()
}
