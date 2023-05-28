import { useState, useEffect } from 'react'
import futureLogo from '/future.svg'
import './App.css'

import io from 'socket.io-client';
const socket = io();

function App() {
  const [count, setCount] = useState(0)

  const [apiResponse, setApiResponse] = useState('')
  const [socketResponse, setSocketResponse] = useState('')

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

  socket.on("pong", (data) => {
    console.log(data);
    setSocketResponse(data)
  });

  useEffect(() => {
    testSocket()
  }, [])

  socket.on("connect", () => {
    console.log(socket.id);
  });

  return (
    <>
      <div>
        <a href="https://github.com/sydney-sisco/webapp-template" target="_blank">
          <img src={futureLogo} className="logo" alt="future logo" />
        </a>
      </div>
      <h1>webapp-template</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the logo to learn more
      </p>
      <button onClick={testApi}>test connection to backend</button>
      <p>{apiResponse}</p>
      <button onClick={testSocket}>test socket connection</button>
      <p>{socketResponse}</p>
    </>
  )
}

export default App
