import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function TextEditor() {
  const [isEditMode, setEditMode] = useState(false);
  const [text, setText] = useState('');

  const handleEditClick = () => setEditMode(true);

  const handleSaveClick = () => setEditMode(false);

  const handleChange = (event) => setText(event.target.value);

  return (
    <div>
      {isEditMode ? (
        <div>
          <TextField
            multiline
            variant="outlined"
            value={text}
            onChange={handleChange}
          />
          <Button onClick={handleSaveClick} color="primary">
            Save
          </Button>
        </div>
      ) : (
        <div>
          <Typography style={{ whiteSpace: 'pre-line' }}>
            {text}
          </Typography>
          <Button onClick={handleEditClick} color="primary">
            Edit
          </Button>
        </div>
      )}
    </div>
  );
}

export default TextEditor;