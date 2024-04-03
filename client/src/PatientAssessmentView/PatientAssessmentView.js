import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import getLPTheme from '../landing-page/getLPTheme';
import DocAppBar from '../DoctorLand/DocAppBar';
import { viewPatients } from './../api/viewPatients'; // Assuming this function exists in your API file

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

  //A page where the doctor will see their patients assessment forms
  //Author @Rafael and Chase

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

  const handlePatientClick = (patient) => {
    // Handle patient click logic here, e.g., view assessment form
    console.log("Clicked on patient:", patient);
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
                onClick={() => handlePatientClick(patient)}
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
