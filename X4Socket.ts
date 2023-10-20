import net from 'node:net'

class X4Socket {
  private x4SocketConnected = false
  private x4SocketPath: string = ''
  private x4Socket: null | net.Socket = null

  public isConnected() {
    return this.x4SocketConnected
  }

  write(msg: string) {
    if (!this.x4Socket || !this.x4SocketConnected) {
      return false
    }

    console.log(`⚙️\t[X4Pipe] Sending ${msg}`)
    // Important: TWO new lines or socket my lock up game waiting for finish 🤷
    return this.x4Socket.write(Buffer.from(`${msg}\n\n`, 'utf-8'))
  }

  connect(path: string) {
    this.x4SocketPath = path
    this.x4SocketConnected = false

    const _socket = net.createConnection(this.x4SocketPath).on('error', (err: Error) => {
      // console.error('⚙️\t[X4Pipe] Error', err.message)
      this.x4SocketConnected = false
    })

    _socket.on('connect', () => {
      this.x4SocketConnected = true
      console.log('⚙️\t[X4Pipe] Socket connected')
    })

    _socket.on('end', () => {
      this.x4SocketConnected = false
      console.log('⚙️\t[X4Pipe] Socket disconnected')
    })

    this.x4Socket = _socket
    return _socket
  }
}

export default X4Socket
