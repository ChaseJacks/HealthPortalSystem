import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import getLPTheme from '../landing-page/getLPTheme';
import DocAppBar from '../DoctorLand/DocAppBar';
import { viewPatients } from './../api/viewPatients'; // Assuming this function exists in your API file
import { viewAssessmentForm } from '../api/viewAssessmentForm';

export default function PatientAssessmentView() {
  const [mode, setMode] = React.useState('dark');
  const [showCustomTheme, setShowCustomTheme] = React.useState(true);
  const [patients, setPatients] = React.useState([]);
  const LPtheme = createTheme(getLPTheme(mode));
  const defaultTheme = createTheme({ palette: { mode } });

  const toggleColorMode = () => {
    setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const toggleCustomTheme = () => {
    setShowCustomTheme((prev) => !prev);
  };

  // Fetch patient data on component mount
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchPatientData();
        setPatients(data);
      } catch (error) {
        console.error('Error fetching patient data:', error);
      }
    };

    fetchData();
  }, []);

  // Function to fetch patient data from the API
  const fetchPatientData = async () => {
    try {
      const patientList = await viewPatients(localStorage.getItem("userTypeID"));
      console.log('Fetched patient data:', patientList);
      return patientList;
    } catch (error) {
      console.error('Error fetching patient data:', error);
      return [];
    }
  };

  // Function to handle clicking on patient's name
  const handlePatientClick = async (PatientID) => {
    // Perform a different function to display the patient's assessment form with the patientId
    try{
    console.log("Clicked on patient with ID:", PatientID);
    const patientForm = await viewAssessmentForm(PatientID)
    console.log(patientForm)
    }catch (error){
      console.error('Error fetchin Patients Assessment Form')
    }
    
  };

  return (
    <ThemeProvider theme={showCustomTheme ? LPtheme : defaultTheme}>
      <CssBaseline />
      <DocAppBar mode={mode} toggleColorMode={toggleColorMode} />
      <Box sx={{ bgcolor: 'background.default', py: 2 }}>
        <Grid container spacing={2} direction="column">
          {/* Render patient buttons */}
          {patients.map((patient, index) => (
            <Grid item key={index}>
              <Button
                variant="outlined"
                onClick={() => handlePatientClick(patient.PatientID)} // Pass the patientId to handlePatientClick function
                fullWidth
                sx={{
                  bgcolor: showCustomTheme && mode === 'light' ? 'white' : 'transparent', // Set background color to white in light mode
                  '&:hover': {
                    bgcolor: showCustomTheme && mode === 'light' ? '#f0f0f0' : 'transparent', // Light gray background color on hover in light mode
                  },
                }}
              >
                {patient.PatientName} - {patient.Location} - {new Date(patient.Date).toLocaleDateString()}
              </Button>
            </Grid>
          ))}
        </Grid>
      </Box>
    </ThemeProvider>
  );
}
