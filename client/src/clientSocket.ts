import { io, Socket } from 'socket.io-client'

import { ClientToServerEvents, ServerToClientEvents } from '../../interfaces/Websocket.interface'
import { SOCKETTIMEOUT, SOCKETURL } from './config'

const clientSocket: Socket<ServerToClientEvents, ClientToServerEvents> = io(SOCKETURL, {
  autoConnect: true,
  timeout: SOCKETTIMEOUT,
  upgrade: true,
  reconnection: true,
})

export default clientSocket
