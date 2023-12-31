import { ShipTargeted } from './Journal.interface'
import { Status } from './Status.interface'

/**
 * @see https://socket.io/docs/v4/typescript/
 */
export interface ServerToClientEvents {
  noArg: () => void
  status: (s: Status) => void
  shipTargeted: (sT: ShipTargeted) => void
  basicEmit: (a: number, b: string, c: Buffer) => void
  withAck: (d: string, callback: (e: number) => void) => void
}

export interface ClientToServerEvents {
  hello: () => void
}

export interface InterServerEvents {
  ping: () => void
}

export interface SocketData {
  name: string
  age: number
}
