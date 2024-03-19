import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import DatePicker from '@mui/lab/DatePicker';

export default function CalendarComponent() {
  const [selectedDate, setSelectedDate] = React.useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <Box
      sx={{
        width: '100%',
        textAlign: 'center',
      }}
    >
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
  );
}
