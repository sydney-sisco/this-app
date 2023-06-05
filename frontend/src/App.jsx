import { useState, useEffect } from 'react'
import { socket } from './utils/socket'
import './App.css'
import Header from './components/Header';
import NotebookSidebar from './components/NotebookSidebar';
import NoteSidebar from './components/NoteSidebar';
import NoteEditor from './components/NoteEditor';

function App() {
  const [count, setCount] = useState(0)

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
      <Header />
      <div className="main">
        <NotebookSidebar />
        <NoteSidebar />
        <NoteEditor />
      </div>
    </div>
  )
}

export default App
