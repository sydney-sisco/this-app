import { useState } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import TextEditor from './TextEditor';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component={'div'}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

export default function ProjectTabs({ data, handleAdd, handleUpdate, handleDelete, isEditing, setIsEditing, tempItem, setTempItem }) {

  const [value, setValue] = useState(0);
  // const [isEditing, setIsEditing] = useState(false);
  // const [tempItem, setTempItem] = useState({});

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleEdit = (item) => {
    setTempItem(item);
    setIsEditing(true);
  };

  const handleSave = () => {
    if (tempItem.id) {
      handleUpdate(tempItem.id, tempItem);
    } else {
      handleAdd(tempItem);
    }
    setTempItem({});
    setIsEditing(false);
  };

  const onDelete = (id) => {
    // change value to the previous tab if the current tab is deleted
    if (value === data.length - 1) {
      setValue(value - 1);
    } else {
      setValue(value);
    }

    handleDelete(id);
  };


  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="dynamic tabs">
          {data.map((tab, index) => (
            <Tab key={index} label={tab.title} />
          ))}
        </Tabs>
      </Box>

      {data.map((item, index) => (
        <TabPanel value={value} key={index} index={index}>
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
            : (
              <div key={item.id}>
                <Typography>{item.title}</Typography>
                <Typography style={{ whiteSpace: 'pre-line' }}>
                  {item.text}
                </Typography>
                <Button variant="contained" onClick={() => handleEdit(item)}>Edit</Button>
                <Button variant="contained" onClick={() => onDelete(item.id)}>Delete</Button>
              </div>
            )
          }
        </TabPanel>
      ))}
    </Box>
  );
}
