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
  const [selectedDate, setSelectedDate] = useState(null); // State to store selected date
  const [selectedTime, setSelectedTime] = useState('08:00'); // State to store selected time (default 08:00)
  const LPtheme = createTheme(getLPTheme(mode));
  const defaultTheme = createTheme({ palette: { mode } });

  const toggleColorMode = () => {
    setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const toggleCustomTheme = () => {
    setShowCustomTheme((prev) => !prev);
  };

  const handleDateClick = (date) => {
    // Set the selected date when a date is clicked
    setSelectedDate(date);
  };

  const handleTimeChange = (event) => {
    // Update the selected time when time input changes
    setSelectedTime(event.target.value);
  };

  const handleSchedule = () => {
    // Confirm if the user wants to schedule an appointment with selected date and time
    const confirmSchedule = window.confirm(`Do you want to schedule an appointment on ${selectedDate} at ${selectedTime}?`);
    if (confirmSchedule) {
      // Handle scheduling logic here
      console.log(`Appointment scheduled for ${selectedDate} at ${selectedTime}`);
      // You can store the selected date and time in the database or perform any other action
    }
  };

  return (
    <ThemeProvider theme={showCustomTheme ? LPtheme : defaultTheme}>
      <CssBaseline />
      <ScheduleAppBar mode={mode} toggleColorMode={toggleColorMode} toggleCustomTheme={toggleCustomTheme} />
      <Box sx={{ bgcolor: 'background.default', marginTop: '80px', textAlign: 'center' }}>
        <h1>Schedule Appointment</h1>
        <div style={{ maxWidth: '500px', margin: '0 auto', color: 'black' }}>
          <Calendar onClickDay={handleDateClick} />
          {selectedDate && (
            <div>
              <label htmlFor="time">Select Time:</label>
              <input
                type="time"
                id="time"
                name="time"
                value={selectedTime}
                onChange={handleTimeChange}
                min="08:00"
                max="18:00"
                step="900" // 15-minute intervals
              />
            </div>
          )}
          <button onClick={handleSchedule}>Schedule Appointment</button>
        </div>
      </Box>
    </ThemeProvider>
  );
};

export default ScheduleAppointmentPage;
