import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import ScheduleAppBar from '../landing-page/components/ScheduleAppBar';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import getLPTheme from '../landing-page/getLPTheme';

const Appointments = () => {
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

  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    // Fetch appointments data from the database
    const fetchAppointments = async () => {
      try {
        // Make API call to fetch appointments data
        const response = await fetch('api/appointments'); // Adjust the API endpoint accordingly
        if (!response.ok) {
          throw new Error('Failed to fetch appointments');
        }
        const data = await response.json();
        setAppointments(data);
      } catch (error) {
        console.error('Error fetching appointments:', error.message);
      }
    };

    fetchAppointments();
  }, []);

  return (
    <ThemeProvider theme={showCustomTheme ? LPtheme : defaultTheme}>
      <CssBaseline />
      <ScheduleAppBar mode={mode} toggleColorMode={toggleColorMode} toggleCustomTheme={toggleCustomTheme} />
      <Container>
        <Box mt={4}>
          <Typography variant="h2" gutterBottom>
            My Appointments
          </Typography>
          {appointments.length === 0 ? (
            <Typography variant="body1">
              You have no appointments scheduled.
            </Typography>
          ) : (
            <ul>
              {appointments.map((appointment) => (
                <li key={appointment.id}>
                  {/* Render appointment details */}
                  <Typography variant="body1">
                    Date: {appointment.date}, Time: {appointment.time}
                  </Typography>
                </li>
              ))}
            </ul>
          )}
          <Box mt={2}>
            <Button component={Link} to="/ScheduleAppointment" variant="contained" color="primary" sx={{ color: 'white' }}>
              Schedule New Appointment
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Appointments;
