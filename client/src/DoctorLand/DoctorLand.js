import * as React from 'react';


import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import DocAppBar from '../DoctorLand/DocAppBar';

import Highlights from '../DoctorLand/Highlights';

import Features from '../DoctorLand/Features';
import PatientList from '../DoctorLand/PatientList';

import getLPTheme from '../landing-page/getLPTheme';




export default function DoctorView() {
  const [mode, setMode] = React.useState('dark');
  const [showCustomTheme, setShowCustomTheme] = React.useState(true);
  const LPtheme = createTheme(getLPTheme(mode));
  const defaultTheme = createTheme({ palette: { mode } });

  const toggleColorMode = () => {
    setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const toggleCustomTheme = () => {
    setShowCustomTheme((prev) => !prev);
  };

  return (
    <ThemeProvider theme={showCustomTheme ? LPtheme : defaultTheme}>
      <CssBaseline />
      <DocAppBar mode={mode} toggleColorMode={toggleColorMode} />

      <Box sx={{ bgcolor: 'background.default' }}>
      <Features />
      <Divider />
      <PatientList />
      <Highlights />
      </Box>
      
    </ThemeProvider>
  );
}