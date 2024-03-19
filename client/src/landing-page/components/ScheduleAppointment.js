import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import getLPTheme from '../getLPTheme';
import ScheduleAppBar from './ScheduleAppBar';

const ScheduleAppointmentPage = () => {
  const [mode, setMode] = useState('dark');
  const [showCustomTheme, setShowCustomTheme] = useState(true);
  const LPtheme = createTheme(getLPTheme(mode));
  const defaultTheme = createTheme({ palette: { mode } });

  const toggleColorMode = () => {
    setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const toggleCustomTheme = () => {
    setShowCustomTheme((prev) => !prev);
  };

  const handleDateClick = (date) => {
    // Handle date click logic here
    console.log(`Date clicked: ${date}`);
  };

  return (
    <ThemeProvider theme={showCustomTheme ? LPtheme : defaultTheme}>
      <CssBaseline />
      <ScheduleAppBar mode={mode} toggleColorMode={toggleColorMode} toggleCustomTheme={toggleCustomTheme} />
      <Box sx={{ bgcolor: 'background.default', marginTop: '80px', textAlign: 'center' }}>
        <h1>Schedule Appointment</h1>
        <div style={{ maxWidth: '500px', margin: '0 auto', color: 'black' }}>
          <Calendar onClickDay={handleDateClick} />
        </div>
      </Box>
    </ThemeProvider>
  );
};

export default ScheduleAppointmentPage;
