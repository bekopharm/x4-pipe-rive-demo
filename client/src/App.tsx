import { useEffect, useState } from 'react'
import './App.css'
import ShipStatus from './ShipStatus/ShipStatus'
import { Simple } from './Simple/Simple'

import clientSocket from './clientSocket'

const App = () => {
  const [socket] = useState(clientSocket)

  useEffect(() => {
    socket.on('connect', () => {
      const engine = socket.io.engine
      console.log('Established', socket.id, 'socket')
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      engine.on('packet', ({ type, data }) => {
        // called for each packet received
        // console.log('Got packet', type, data);
        if (type === 'ping') {
          console.log(type)
        }
      })
    })

    socket.on('disconnect', () => {
      console.log('Disconnected', socket.id, 'socket')
    })

    return function cleanup() {
      if (socket.connected) {
        socket.disconnect()
      }
    }
  }, [socket])

  return (
    <div className="App">
      <header className="App-header">
        { /** Demo from Rive page: */}
        <Simple />
        <div style={{ width: 500, height: 400 }}>
          { /** Demo from C-Pit 101: */}
          <ShipStatus socket={socket} />
        </div>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </a>
      </header>
    </div>
  )
}

export default App
