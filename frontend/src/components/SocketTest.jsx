import { useState, useEffect } from 'react';
import { socket } from '../utils/socket';

export function SocketTest() {
  const [socketResponse, setSocketResponse] = useState('')

  const testSocket = () => {
    socket.emit("ping");
  }

  useEffect(() => {
    function onPingEvent(value) {
      console.log(value);
      setSocketResponse(value);
    }

    socket.on('pong', onPingEvent);

    testSocket();

    return () => {
      socket.off('pong', onPingEvent);
    };
  }, []);

  return (
    <div>
      <button onClick={testSocket}>test socket connection</button>
      <p>{socketResponse}</p>
    </div>
  );
};
