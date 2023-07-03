import { useState, useEffect } from 'react'
import { socket } from './utils/socket'
import './App.css'
import Header from './components/Header';
import BasicTabs from './components/BasicTabs';
import Button from '@mui/material/Button';


function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
    };
  }, []);

  return (
    <div className="app">
      <div className="container">
        <div className="column filters">
          <Header />
          <Button variant="contained">Add project</Button>
        </div>
        <div className="column column-2">
          <BasicTabs />
        </div>
        <div className="column fall">
          Fallen Projects
        </div>
      </div>
    </div>
  )
}

export default App
