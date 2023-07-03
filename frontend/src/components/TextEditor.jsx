import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function TextEditor({ text, onTextSave }) {
  const [isEditMode, setEditMode] = useState(false);
  const [editedText, setEditedText] = useState(text);  // new state variable to hold the edited text

  const handleEditClick = () => setEditMode(true);

  const handleSaveClick = () => {
    setEditMode(false);
    onTextSave(editedText);  // invoke onTextSave with editedText when the save button is clicked.
  };

  const handleChange = (event) => setEditedText(event.target.value);

  return (
    <div>
      {isEditMode ? (
        <div>
          <TextField
            multiline
            fullWidth
            variant="outlined"
            value={editedText}
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
