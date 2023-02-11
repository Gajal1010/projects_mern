import * as React from 'react';
import Box from '@mui/material/Box';
import SignOptions from '../SignOptions/SignOptions';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

export default function DateTabs({ setDay, setSunSign }) {
  const [value, setValue] = React.useState(1);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', bgcolor: 'rgba(229, 240, 245, .4)' }}>
    <Tabs value={value} onChange={handleChange} centered textColor='primary' >
      <Tab label="Yesterday" onClick={() => setDay('Yesterday')} />
      <Tab label="Today" onClick={() => setDay('Today')} />
      <Tab label="Tomorrow" onClick={() => setDay('Tomorrow')} />
      <SignOptions setSunSign={setSunSign} />
    </Tabs>
    </Box>
  );
} 