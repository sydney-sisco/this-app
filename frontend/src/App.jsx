import { useState, useEffect } from 'react'
import { socket } from './utils/socket'
import './App.css'
import Header from './components/Header';
import ProjectTabs from './components/ProjectTabs';
import Button from '@mui/material/Button';
import { usePersistence } from './hooks/usePersistence';
import useIndexedDB from './hooks/useIndexedDB';
import { TextField } from '@mui/material';
import Typography from '@mui/material/Typography';


function App() {
  const { deviceId } = usePersistence();
  const [isConnected, setIsConnected] = useState(socket.connected);

  // Initialize the hook for a specific table
  const { data, addItem, updateItem, deleteItem } = useIndexedDB('projects');

  const [isEditing, setIsEditing] = useState(false);
  const [tempItem, setTempItem] = useState({});

  const handleAdd = () => {
    // Prepare an empty object for the new item.
    setTempItem({});
    setIsEditing(true);
  };

  // const handleSave = () => {
  //   if (tempItem.id) {
  //     updateItem(tempItem.id, tempItem);
  //   } else {
  //     addItem(tempItem);
  //   }
  //   setTempItem({});
  //   setIsEditing(false);
  // };

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
          <Button variant="contained" onClick={handleAdd}>Add project</Button>
        </div>
        <div className="column column-2">
          <ProjectTabs
            data={data} 
            handleAdd={addItem}
            handleUpdate={updateItem}
            handleDelete={handleDelete}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            tempItem={tempItem}
            setTempItem={setTempItem}
          />
          {/* <div>
            {isEditing
              ? (
                <div>
                  <TextField
                    variant='outlined'
                    value={tempItem.title}
                    onChange={e => setTempItem({ ...tempItem, title: e.target.value })}
                  />
                  <TextField
                    multiline
                    fullWidth
                    variant="outlined"
                    value={tempItem.text}
                    onChange={e => setTempItem({ ...tempItem, text: e.target.value })}
                  />
                  <Button variant="contained" onClick={handleSave}>Save</Button>
                  <Button variant="contained" onClick={() => setIsEditing(false)}>Cancel</Button>
                </div>
              )
              : data.map(item => (
                <div key={item.id}>
                  <Typography>{item.title}</Typography>
                  <Typography style={{ whiteSpace: 'pre-line' }}>
                    {item.text}
                  </Typography>
                  <Button variant="contained" onClick={() => handleEdit(item)}>Edit</Button>
                  <Button variant="contained" onClick={() => handleDelete(item.id)}>Delete</Button>
                </div>
              ))
            }
          </div> */}
        </div>
        <div className="column fall">
          Fallen Projects
        </div>
      </div>
    </div>
  )
}

export default App
