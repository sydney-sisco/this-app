import { useState } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
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
          <Typography>{children}</Typography>
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

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [tabs, setTabs] = useState([
    { label: "Item One", text: "placeholder from initial state" },
  ]);
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const addTab = (label, content) => {
    setTabs(oldTabs => [...oldTabs, { label, content }]);
  };

  const deleteTab = (index) => {
    setTabs(oldTabs => oldTabs.filter((_, i) => i !== index));
  };

  const handleTextSave = (newText, tabIndex) => {
    setTabs(tabs =>
      tabs.map((tab, index) =>
        index === tabIndex ? { ...tab, text: newText } : tab
      )
    );
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="dynamic tabs">
          {tabs.map((tab, index) => (
            <Tab key={index} label={tab.label} {...a11yProps(index)} />
          ))}
        </Tabs>
      </Box>

      {tabs.map((tab, index) => (
        <TabPanel value={value} key={index} index={index}>
          <TextEditor
            text={tab.text}
            onTextSave={newText => handleTextSave(newText, index)}
          />
        </TabPanel>
      ))}

      <Button variant="contained" onClick={() => addTab(`Item ${tabs.length + 1}`, `Item ${tabs.length + 1}`)}>Add Project</Button>
      <Button variant="contained" onClick={() => deleteTab(value)} >Delete Project</Button>
    </Box>
  );
}
