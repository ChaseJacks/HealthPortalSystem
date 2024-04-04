import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import getLPTheme from '../getLPTheme';
import ScheduleAppBar from '../../Menu Bars/PatientBars/ScheduleAppBar';
import { viewDoctors } from '../../api/viewDoctors'; // Import your API function
import { createAppointment } from '../../api/createAppointment';



const ScheduleAppointmentPage = () => {
  const [mode, setMode] = useState('dark');
  const [showCustomTheme, setShowCustomTheme] = useState(true);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState('08:00');
  const [selectedLocation, setSelectedLocation] = useState(null); // State to store selected location
  const [selectedDoctor, setSelectedDoctor] = useState(null); // State to store selected doctor
  const [doctors, setDoctors] = useState([]); // State to store doctors fetched from the database

  const LPtheme = createTheme(getLPTheme(mode));
  const defaultTheme = createTheme({ palette: { mode } });

  const toggleColorMode = () => {
    setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const toggleCustomTheme = () => {
    setShowCustomTheme((prev) => !prev);
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  const handleTimeChange = (event) => {
    setSelectedTime(event.target.value);
  };

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
  };

  const handleDoctorSelect = (doctor) => {
    setSelectedDoctor(doctor);
  };

  const fetchDoctorData = async () => {
    try {
        const doctorResponse = await viewDoctors();
        
        if (!doctorResponse) {
            console.log("Error getting doctor list from database");
            return [];
        }

        const doctorList = doctorResponse.recordset;
        return doctorList;

    } catch (err) {
        console.error(err);
        return [];
    }
};

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchDoctorData(); // Assuming viewDoctors fetches doctors from the database
        setDoctors(data);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };
    fetchData();
  }, []);

  const handleSchedule = async() => {
    const confirmSchedule = window.confirm(`Do you want to schedule an appointment on ${selectedDate} at ${selectedTime}?`);
    if (confirmSchedule) {
      console.log(`Appointment scheduled for ${selectedDate} at ${selectedTime}`);
      // Combine selectedDate and selectedTime into a single datetime variable
      const datetime = new Date(selectedDate);
      const timeParts = selectedTime.split(':');
      datetime.setHours(parseInt(timeParts[0], 10));
      datetime.setMinutes(parseInt(timeParts[1], 10));
      
      // Store selected appointment details in the database
      const patientID1= localStorage.getItem("userTypeID")
      const doctor1= selectedDoctor.DoctorID
      const date1= datetime.toISOString() // Convert to ISO string for compatibility with Azure DB
      const location1= selectedLocation
      
     
      try {
      const results = await createAppointment(patientID1,doctor1, date1,location1)
      console.log(results);
    }catch(err) { 
        console.log("Error creating appointment" + err.message)
      }
      
      window.location.href = "/landing"
    }
  };
  

  const locations = ["Clinic 1", "Clinic 2", "Clinic 3"];

  return (
    <ThemeProvider theme={showCustomTheme ? LPtheme : defaultTheme}>
      <CssBaseline />
      <ScheduleAppBar mode={mode} toggleColorMode={toggleColorMode} toggleCustomTheme={toggleCustomTheme} />
      <Box sx={{ bgcolor: 'background.default', marginTop: '80px', textAlign: 'center' }}>
        <h1>Schedule Appointment</h1>
        <div style={{ maxWidth: '500px', margin: '0 auto', color: mode === 'dark' ? 'white' : 'black' }}>
          <div>
            <h2>Select Location:</h2>
            <ul>
              {locations.map(location => (
                <li key={location} onClick={() => handleLocationSelect(location)}>
                  {location}
                </li>
              ))}
            </ul>
          </div>
          {selectedLocation && (
            <div>
              <h2>Select Doctor:</h2>
              {/* Display doctors based on selected location */}
              {/* Replace this with your actual doctor selection logic */}
              <ul>
                {doctors.map(doctor => (
                  <li key={doctor.id} onClick={() => handleDoctorSelect(doctor)}>
                  <div>
                    
                    <h3>{doctor.Name}</h3>
                    <p>{doctor.Specialization}</p>
                  </div>
                </li>
                ))}
              </ul>
            </div>
          )}
          {selectedDoctor && (
            <div>
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
                  <button onClick={handleSchedule}>Schedule Appointment</button>
                </div>
              )}
            </div>
          )}
        </div>
      </Box>
    </ThemeProvider>
  );
};

export default ScheduleAppointmentPage;
