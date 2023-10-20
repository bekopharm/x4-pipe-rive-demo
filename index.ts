import cors from 'cors'
import dotenv from 'dotenv'
import express, { Express, Request, Response } from 'express'
import http from 'http'
import path from 'path'
import { Server } from 'socket.io'
import X4Socket from './X4Socket'
import { ShipTargeted } from './interfaces/Journal.interface'
import { Status } from './interfaces/Status.interface'
import {
  ClientToServerEvents,
  InterServerEvents,
  ServerToClientEvents,
  SocketData,
} from './interfaces/Websocket.interface'

dotenv.config()

const x4SocketPath = process.env.X4SOCKETPATH || '/home/beko/.config/EgoSoft/X4/save/x4_python_host.xml'
const port = process.env.PORT || 8000

// poor man's cache for /api access demo
let status: Status | null = null
let shipTargeted: ShipTargeted | null = null

// Setup Express Webserver
const app: Express = express()

app.use(cors())

// serve React app static fields from dist/client/build
app.use(express.static('client/build'))

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
})

// add some demo /api routes
app.get('/api', (req: Request, res: Response) => {
  res.json({ msg: 'Hi' })
})

app.get('/api/status', (req: Request, res: Response) => {
  res.json({ msg: status })
})

app.get('/api/shipTargeted', (req: Request, res: Response) => {
  res.json({ msg: shipTargeted })
})


const webserver = http.createServer(app)

// Setup Socket.IO
const WEBSOCKET_CORS = {
  //origin: `http://localhost:${port}`,
  origin: '*',
  methods: ['GET', 'POST'],
}

// add SocketIO to webserver
const io = new Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>(webserver, {
  cors: WEBSOCKET_CORS,
})

io.on('connection', (socket) => {
  console.log('🤖\t[SocketIO] User connected')

  socket.on('disconnect', () => {
    console.log('🤖\t[SocketIO] User disconnected')
  })

  socket.emit('noArg')
  socket.emit('basicEmit', 1, '2', Buffer.from([3]))
  socket.emit('withAck', '4', (e) => {
    // e is inferred as number
  })

  // works when broadcast to all
  // io.emit('noArg')

  // works when broadcasting to a room
  // io.to('room1').emit('basicEmit', 1, '2', Buffer.from([3]))
})

// Setup X4 socket
const x4Socket = new X4Socket()
let x4Connecton = x4Socket.connect(x4SocketPath)

// reconnect automatically
let iDebug = 0
setInterval(() => {
  if (!x4Socket.isConnected()) {
    iDebug % 50 == 0 ? console.log(`⚙️\t[X4Pipe] Not connected, reconnecting ${x4SocketPath}…`) : ''
    x4Connecton = x4Socket.connect(x4SocketPath)
    iDebug++
  }
}, 200)

// Do something with received data
x4Connecton.on('data', function (data: ArrayBuffer) {
  const b = Buffer.from(data)
  let obj: any = {}
  try {
    const buffer_str = b.toString('utf-8')
    obj = JSON.parse(buffer_str)
    // overwriting with receive date - game does not offer us milliseconds
    obj.timestamp = new Date()
  } catch (error) {
    console.warn('⚙️\t[X4Pipe] Could not parse JSON from message ', b.toString('utf-8'))
  }

  if (!Object.keys(obj).length) {
    return
  }

  switch (obj?.event) {
    case 'Status':
      status = <Status>{ ...obj }
      io.emit('status', status)
      break
    case 'ShipTargeted':
      shipTargeted = <ShipTargeted>{ ...obj }
      io.emit('shipTargeted', shipTargeted)
      break
    default:
      console.log('⚙️\t[X4Pipe] Received unknown data', JSON.stringify(obj))
      break
  }
})

// Writing _to_ X4 Pipe example (each minute)
setInterval(() => {
  if (x4Socket.isConnected()) {
    const msg = 'read:[Time].getSystemTime'
    console.log(`⚙️\t[X4Pipe] Sending ${msg}`)
    x4Socket.write(msg)
  }
}, 60000)

// Start everything
webserver.listen(port, () => {
  console.log(`⚡️\t[Webserver] Webserver is running at http://localhost:${port}`)
  console.log(`⚡️\t[Webserver] Try http://localhost:${port}/api/status for GET example`)
  console.log(`⚡️\t[Webserver] Try ws://localhost:${port}/ for SocketIO messages`)
})
