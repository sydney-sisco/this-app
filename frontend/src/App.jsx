import { useState, useEffect } from 'react'
import futureLogo from '/future.svg'
import './App.css'

import { socket } from './utils/socket'
import { ConnectionState } from './components/ConnectionState'

function App() {
  const [count, setCount] = useState(0)

  const [apiResponse, setApiResponse] = useState('')
  const [socketResponse, setSocketResponse] = useState('')

  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    testApi()
  }, [])

  const testApi = async () => {
    const response = await fetch('/api/test')
    const data = await response.json()
    console.log(data)
    setApiResponse(JSON.stringify(data, null, 2))
  }

  const testSocket = () => {
    socket.emit("ping");
  }

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onPingEvent(value) {
      console.log(value);
      setSocketResponse(value);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('pong', onPingEvent);

    testSocket();

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('pong', onPingEvent);
    };
  }, []);

  return (
    <>
      <div>
        <a href="https://github.com/sydney-sisco/webapp-template" target="_blank">
          <img src={futureLogo} className="logo" alt="future logo" />
        </a>
      </div>
      <h1>webapp-template</h1>
      <p className="read-the-docs">
        Click on the logo to learn more
      </p>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <button onClick={testApi}>test connection to backend</button>
      <p>{apiResponse}</p>
      <button onClick={testSocket}>test socket connection</button>
      <p>{socketResponse}</p>
      <ConnectionState isConnected={ isConnected } />
    </>
  )
}

export default App
