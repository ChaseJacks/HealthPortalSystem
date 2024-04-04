import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import PatientApptAppBar from '../Menu Bars/PatientBars/PatientApptAppBar';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import getLPTheme from '../landing-page/getLPTheme';

import { viewAppointments } from './../api/viewPatientAppointments';


//Author @Chase Jackson 
//This is a simple appointments page that pulls the users appointments
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
    const fetchAppointments = async () => {
      try {
        const response = await viewAppointments(localStorage.getItem("userTypeID"));
        console.log("Response:", response); // Log the response object
  
        // Check if response data is empty or undefined
        if (!response || response.length === 0) {
          throw new Error("Failed to fetch appointments: Response data is empty");
        }
  
        const data = response.map(appointment => ({
          doctorName: appointment.DoctorName,
          location: appointment.Location,
          date: new Date(appointment.Date).toLocaleDateString(),
          time: new Date(appointment.Date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }), // Format time (e.g., 9:00 AM)
        }));
  
        setAppointments(data);
      } catch (err) {
        console.error("Error retrieving appointments:", err.message);
      }
    };
  
    fetchAppointments();
  }, []);
  
  return (
    <ThemeProvider theme={showCustomTheme ? LPtheme : defaultTheme}>
      <CssBaseline />
      <PatientApptAppBar mode={mode} toggleColorMode={toggleColorMode} toggleCustomTheme={toggleCustomTheme} />
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
            <Box display="flex" flexDirection="column" alignItems="flex-start">
              {appointments.map((appointment, index) => (
                <Card key={index} variant="outlined" style={{ marginBottom: '10px' }}>
                  <CardContent>
                    <Typography variant="h5" component="div">
                      Appointment with {appointment.doctorName}
                    </Typography>
                    <Typography variant="body1">
                      Location: {appointment.location}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Date: {appointment.date}, Time: {appointment.time}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Box>
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
