import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import DatePicker from '@mui/lab/DatePicker';
import { useTheme } from '@mui/material/styles';

export default function Highlights() {
  const [selectedDate, setSelectedDate] = useState(null);
  const theme = useTheme();

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <Box
      id="highlights"
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        color: theme.palette.mode === 'dark' ? 'white' : 'black', // Adjust text color based on theme mode
        bgcolor: theme.palette.mode === 'dark' ? '#06090a' : 'white', // Adjust background color based on theme mode
      }}
    >
      <Container
        sx={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: { xs: 3, sm: 6 },
        }}
      >
        <Box
          sx={{
            width: { sm: '100%', md: '60%' },
            textAlign: { sm: 'center' },
          }}
        >
          <CalendarTodayIcon sx={{ fontSize: 60, color: 'grey.400' }} />
          <Typography component="h2" variant="h4" sx={{ marginBottom: 2 }}>
            Select a Date
          </Typography>
          <DatePicker
            label="Choose a Date"
            value={selectedDate}
            onChange={handleDateChange}
            renderInput={(params) => <Box sx={{ textAlign: 'center' }}><input {...params.inputProps} /></Box>}
            sx={{ textAlign: 'center' }}
          />
        </Box>
        <Button
          component={Link}
          to="/ScheduleAppointment"
          variant="contained"
          color="primary"
          sx={{ marginTop: 2, color: theme.palette.mode === 'dark' ? 'white' : 'black' }} // Adjust text color based on theme mode
        >
          Schedule Appointment
        </Button>
      </Container>
    </Box>
  );
}
