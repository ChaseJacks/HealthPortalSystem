import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import ToggleColorMode from '../../landing-page/components/ToggleColorMode';

function DocAppBar({ mode, toggleColorMode }) {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const logoutUser = () => {
    localStorage.removeItem("userID");
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("userTypeID");
    localStorage.removeItem("name");

    window.location.href = "/";
}

  const scrollToSection = (sectionId) => {
    const sectionElement = document.getElementById(sectionId);
    const offset = 128;
    if (sectionElement) {
      const targetScroll = sectionElement.offsetTop - offset;
      sectionElement.scrollIntoView({ behavior: 'smooth' });
      window.scrollTo({
        top: targetScroll,
        behavior: 'smooth',
      });
      setOpen(false);
    }
  };

  return (
    <div>
      <AppBar
        position="fixed"
        sx={{
          boxShadow: 0,
          bgcolor: 'transparent',
          backgroundImage: 'none',
          mt: 2,
        }}
      >
        <Container maxWidth="lg">
          <Toolbar
            variant="regular"
            sx={(theme) => ({
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexShrink: 0,
              borderRadius: '999px',
              bgcolor:
                theme.palette.mode === 'light'
                  ? 'rgba(255, 255, 255, 0.4)'
                  : 'rgba(0, 0, 0, 0.4)',
              backdropFilter: 'blur(24px)',
              maxHeight: 40,
              border: '1px solid',
              borderColor: 'divider',
              boxShadow:
                theme.palette.mode === 'light'
                  ? `0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)`
                  : '0 0 1px rgba(2, 31, 59, 0.7), 1px 1.5px 2px -1px rgba(2, 31, 59, 0.65), 4px 4px 12px -2.5px rgba(2, 31, 59, 0.65)',
            })}
          >
            <Box
              sx={{
                flexGrow: 1,
                display: 'flex',
                alignItems: 'center',
                ml: '-18px',
                px: 0,
              }}
            >
              <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                {/* Update the onClick handlers to navigate to different routes
                Here is where you will add more buttons on the app bar like so, routes are not yet made but will be eventually.
                */}
                <MenuItem component={Link} to="/DoctorLand" sx={{ py: '6px', px: '12px' }}>
                  <Typography variant="body2" color="text.primary">
                    Home 
                  </Typography>
                </MenuItem>
                <MenuItem component={Link} to="/ViewPatientAssessments" sx={{ py: '6px', px: '12px' }}>
                  <Typography variant="body2" color="text.primary">
                    Patients & Assessments 
                  </Typography>
                </MenuItem>
                <MenuItem component={Link} to="/ManageAppointments" sx={{ py: '6px', px: '12px' }}>
                  <Typography variant="body2" color="text.primary">
                    Manage Appointments
                  </Typography>
                </MenuItem>
                <MenuItem component={Link} to="/MessagePatient" sx={{ py: '6px', px: '12px' }}>
                  <Typography variant="body2" color="text.primary">
                    Message Patient
                  </Typography>
                </MenuItem>
                <MenuItem anchor = "right" onClick={logoutUser} sx={{ py: '6px', px: '12px' }}>
                  <Typography variant="body2" color="text.primary">
                    Logout
                  </Typography>
                </MenuItem>
                
              </Box>
            </Box>
            <Box
              sx={{
                display: { xs: 'none', md: 'flex' },
                gap: 0.5,
                alignItems: 'center',
              }}
            >
              <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} />
            </Box>
            <Box sx={{ display: { sm: '', md: 'none' } }}>
              <Button
                variant="text"
                color="primary"
                aria-label="menu"
                onClick={toggleDrawer(true)}
                sx={{ minWidth: '30px', p: '4px' }}
              >
                <MenuIcon />
              </Button>
              <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
                <Box
                  sx={{
                    minWidth: '60dvw',
                    p: 2,
                    backgroundColor: 'background.paper',
                    flexGrow: 1,
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'end',
                      flexGrow: 1,
                    }}
                  >
                    <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} />
                  </Box>
                  {/* Update the onClick handlers to navigate to different routes
                  Here is something I havent touched but yet it works so no touchy.
                  */}
                  <MenuItem component={Link} to="/DoctorLand" sx={{ py: '6px', px: '12px' }}>
                  <Typography variant="body2" color="text.primary">
                    Home 
                  </Typography>
                </MenuItem>
                <MenuItem component={Link} to="/ViewPatientAssessments" sx={{ py: '6px', px: '12px' }}>
                  <Typography variant="body2" color="text.primary">
                    Patients & Assessments 
                  </Typography>
                </MenuItem>
                <MenuItem component={Link} to="/ManageAppointments" sx={{ py: '6px', px: '12px' }}>
                  <Typography variant="body2" color="text.primary">
                    Manage Appointments
                  </Typography>
                </MenuItem>
                <MenuItem component={Link} to="/MessagePatient" sx={{ py: '6px', px: '12px' }}>
                  <Typography variant="body2" color="text.primary">
                    Message Patient
                  </Typography>
                </MenuItem>
                <MenuItem anchor = "right" onClick={logoutUser} sx={{ py: '6px', px: '12px' }}>
                  <Typography variant="body2" color="text.primary">
                    Logout
                  </Typography>
                </MenuItem>
                  <Divider />
                  
                </Box>
              </Drawer>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}

DocAppBar.propTypes = {
  mode: PropTypes.oneOf(['dark', 'light']).isRequired,
  toggleColorMode: PropTypes.func.isRequired,
};

export default DocAppBar;
