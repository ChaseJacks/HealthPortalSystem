import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/system';
import { viewDoctors } from '../../api/viewDoctors'; // Import your API function


  const fetchDoctorData = async () => {
    try {
        const doctorResponse = await viewDoctors("Name, Specialization");
        
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


export default function Doctors() {
  const theme = useTheme();

  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchDoctorData();
      setDoctors(data);
    };
    fetchData();
  }, []);

  return (
    <Container
      id="doctors"
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
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
          textAlign: { sm: 'left', md: 'center' },
        }}
      >
        <Typography component="h2" variant="h4" color="text.primary">
          Doctors Available
        </Typography>
        <Typography variant="body1" color="text.secondary">
          See the list of doctors available for consultation.
        </Typography>
      </Box>
      <Grid container spacing={2}>
        {doctors.map((doctor, index) => (
          <Grid item xs={12} sm={6} md={4} key={index} sx={{ display: 'flex' }}>
            <Card
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                flexGrow: 1,
                p: 1,
              }}
            >
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {doctor.Specialization}
                </Typography>
              </CardContent>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  pr: 2,
                }}
              >
                <CardHeader
                  avatar={<Avatar>{doctor.Name[0]}</Avatar>}
                  title={doctor.Name}
                />
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
