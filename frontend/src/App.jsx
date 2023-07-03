import { useState, useEffect } from 'react'
import { socket } from './utils/socket'
import './App.css'
import Header from './components/Header';
import ProjectTabs from './components/ProjectTabs';
import Button from '@mui/material/Button';
import { usePersistence } from './hooks/usePersistence';
import useIndexedDB from './hooks/useIndexedDB';


function App() {
  const { deviceId } = usePersistence();
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [isEditing, setIsEditing] = useState(false);
  const [tempItem, setTempItem] = useState({});

  // Initialize the hook for a specific table
  const { data, addItem, updateItem, deleteItem } = useIndexedDB('projects');

  const handleAdd = () => {
    // Prepare an empty object for the new item.
    setTempItem({});
    setIsEditing(true);
  };
  
  const handleEdit = (item) => {
    setTempItem(item);
    setIsEditing(true);
  };

  const handleSave = () => {
    if (tempItem.id) {
      updateItem(tempItem.id, tempItem);
    } else {
      addItem(tempItem);
    }
    setTempItem({});
    setIsEditing(false);
  };

  const handleDelete = (id) => {
    deleteItem(id);
  };

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
          {/* <ProjectTabs
            data={data} 
            handleAdd={handleAdd}
            handleUpdate={handleUpdate}
            handleDelete={handleDelete}
          /> */}
          <div>
            {isEditing
              ? (
                <div>
                  {/* Edit Form Goes Here */}
                  <input type="text" value={tempItem.title} onChange={e => setTempItem({ ...tempItem, title: e.target.value })} />
                  <button onClick={handleSave}>Save</button>
                </div>
              )
              : data.map(item => (
                <div key={item.id}>
                  {/* Item View Goes Here */}
                  <p>{item.title}</p>
                  <button onClick={() => handleEdit(item)}>Edit</button>
                  <button onClick={() => handleDelete(item.id)}>Delete</button>
                </div>
              ))
            }
            <button onClick={handleAdd}>Add Item</button>
          </div>
        </div>
        <div className="column fall">
          Fallen Projects
        </div>
      </div>
    </div>
  )
}

export default App
