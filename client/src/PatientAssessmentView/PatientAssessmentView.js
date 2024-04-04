import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import getLPTheme from '../landing-page/getLPTheme';
import ViewPAAppBar from '../Menu Bars/DoctorBars/ViewPAAppBar';
import { viewPatients } from './../api/viewPatients'; // Assuming this function exists in your API file
import { viewAssessmentForm } from '../api/viewAssessmentForm';

export default function PatientAssessmentView() {
  const [mode, setMode] = React.useState('dark');
  const [showCustomTheme, setShowCustomTheme] = React.useState(true);
  const [patients, setPatients] = React.useState([]);
  const [patientFormDisplayed, setPatientFormDisplayed] = React.useState(false);
  const [patientResponse, setPatientResponse] = React.useState(null);
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
    try {
      console.log("Clicked on patient with ID:", PatientID);
      const patientForm = await viewAssessmentForm(PatientID);
      console.log(patientForm);

      // Exclude the 'signature' field from the patient response
      const patientResponse = patientForm.PatientResponse;
      const filteredPatientResponse = {};
      for (const key in patientResponse) {
        if (key !== 'signature') {
          filteredPatientResponse[key] = patientResponse[key];
        }
      }

      // Display the patient's information only if it's not already displayed
      if (!patientFormDisplayed) {
        setPatientFormDisplayed(true);
        setPatientResponse(filteredPatientResponse);
      }
    } catch (error) {
      console.error('Error fetching Patients Assessment Form');
    }
  };

  // Function to render patient response
  const renderPatientResponse = () => {
    if (!patientResponse) return null;

    // Tidying up patient response
    const tidiedResponse = Object.entries(patientResponse)
      .filter(([key]) => key !== 'signature') // Exclude 'signature' key
      .map(([key, value]) => (
        <p key={key} style={{ color: 'black', margin: 0 }}>
          {key}: {JSON.stringify(value).replace(/"|{|}/g, '')}
          <br /> {/* Add a line break after each key-value pair */}
        </p>
      ));

    return (
      <Box mt={2} p={2} sx={{ bgcolor: 'grey.200' }}>
        <h2 style={{ color: 'black' }}>Patient Response:</h2>
        {tidiedResponse}
      </Box>
    );
  };

  return (
    <ThemeProvider theme={showCustomTheme ? LPtheme : defaultTheme}>
      <CssBaseline />
      <ViewPAAppBar mode={mode} toggleColorMode={toggleColorMode} />
      <Box sx={{ bgcolor: 'background.default', py: 2 }}>
        <Grid container spacing={2} direction="column">
          {/* Render patient buttons */}
          {patients.map((patient, index) => (
            <Grid item key={index}>
              <Button
                variant="outlined"
                onClick={() => handlePatientClick(patient.PatientID)}
                fullWidth
                sx={{
                  bgcolor: showCustomTheme && mode === 'light' ? 'white' : 'transparent',
                  '&:hover': {
                    bgcolor: showCustomTheme && mode === 'light' ? '#f0f0f0' : 'transparent',
                  },
                }}
              >
                {patient.PatientName} - {patient.Location} - {new Date(patient.Date).toLocaleDateString()}
              </Button>
            </Grid>
          ))}
        </Grid>
        {/* Render patient response if available */}
        {renderPatientResponse()}
      </Box>
    </ThemeProvider>
  );
}
