import './reference'
import * as path from 'path'
import * as fs from 'fs'
import * as http from 'http'
import * as https from 'https'
import * as express from 'express'
import * as mkdirp from 'mkdirp'
import * as basicAuth from 'express-basic-auth'
import * as minimist from 'minimist';
import { Server } from 'socket.io'
import { ipcSocketIo } from './IpcSocketIo'
import { ConnectionManager } from '../../../backend/src'
import ConfigStorage from '../../../backend/src/ConfigStorage'

/* eslint-disable */

const rawArgv = process.argv.slice(2)
const args = minimist(rawArgv, {
  string: [
    'http-port',
    'config-path',
    'http-user',
    'http-password',
    'ssl-key-path',
    'ssl-cert-path',
  ],
  boolean: [
    'help',
  ],
  alias: {
    'http-port': 'p',
    'config-path': 'c',
    'http-user': 'u',
    'http-password': 'a',
    'ssl-key-path': 'k',
    'ssl-cert-path': 's',
    'help': 'h',
  },
  default: {
    'http-port': '4000',
    'config-path': './config',
    'http-user': '',
    'http-password': '',
  }
});

if (args.h) {

  console.log(`
Run command:
    
    ${process.argv[0]} ${process.argv[0]} [PARAMS]
   
Parameters:
    
    http-port, p      Set server http port (default: 4000)
    config-path, c    Set config path (default: ./config)
    http-user, u      Set http auth user
    http-password, a  Set http auth password
    ssl-key-path, k   Path for ssl key file
    ssl-cert-path, s  Path for ssl cert file
    help, h           Display help
`)
  process.exit(0)
}

/* eslint-enable */

const port = isNaN(parseInt(args.p, 10)) ? 4000 : parseInt(args.p, 10)
const configPath = path.resolve(args.c)
const httpUser = args.u
const httpPassword = args.a
const sslKeyPath = args.k
const sslCertPath = args.s

console.log('Start MQTT Explorer node server')
console.log('')
console.log('    - http-port:', port)
console.log('    - config-path:', configPath)
console.log('    - http-user:', httpUser)
console.log('    - http-password:', httpPassword)
console.log('    - ssl-key-path:', sslKeyPath)
console.log('    - ssl-cert-path:', sslCertPath)
console.log('')

if (!fs.existsSync(configPath)) {
  mkdirp.sync(configPath)
}

const app = express()
let server: any = null
if (sslKeyPath && sslCertPath) {
  server = https.createServer({
    key: fs.readFileSync(sslKeyPath, 'utf8'),
    cert: fs.readFileSync(sslCertPath, 'utf8'),
  }, app)
} else {
  server = http.createServer(app)
}
const io = new Server(server)

if (httpUser && httpPassword) {
  app.use(basicAuth({
    users: { [httpUser]: httpPassword },
    challenge: true,
  }))
}

ipcSocketIo.init(io)

const staticDir = path.resolve(__dirname, '../../../../../../app/build-browser')
const assetsDir = path.resolve(__dirname, '../../../../../assets')

app.get('/', (req, res) => {
  let content = fs.readFileSync(path.resolve(staticDir, 'index.html')).toString()
  content = content.replace('</body>', '<link rel="stylesheet" href="./mobile.css" /></body>')
  res.header('content-type', 'text/html').send(content)
})

app.get('/mobile.css', (req, res) => {
  res.header('content-type', 'text/css').send(fs.readFileSync(path.resolve(assetsDir, 'mobile.css')))
})

app.use(express.static(staticDir))

const connectionManager = new ConnectionManager()
connectionManager.manageConnections()

const configStorage = new ConfigStorage(path.resolve(configPath, 'settings.json'))
configStorage.init()

server.listen(port, () => {
  return console.log(`server is listening on ${port}`)
})
