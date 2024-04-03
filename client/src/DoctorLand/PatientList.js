import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import { useTheme } from '@mui/system';
import { viewPatients } from '../api/viewPatients';
import moment from 'moment';

import { viewAssessmentForm } from '../api/viewAssessmentForm';

const Patients = () => {
    const theme = useTheme();
    const [patients, setPatients] = useState([]);
    const [hoveredIndex, setHoveredIndex] = useState(-1);

    const [patient, setSelectedPatient] = useState(null);

    useEffect(() => {
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
            // Get list of patients

            const patientList = await viewPatients(localStorage.getItem("userTypeID"));

            // Now insert their assessment forms into patientList
            for (let i = 0; i < patientList.length; i++) {
                const assessmentForm = await viewAssessmentForm(patientList[i].PatientID);
                patientList[i].PatientResponse = assessmentForm;
            }

            console.log(patientList);
            return patientList;
        } catch (error) {
            console.error('Error fetching patient data:', error);
            return [];
        }
    };

    const handleSelectPatient = (patient) => {
        setSelectedPatient(patient);
    };

    return (
        <Container
            id="patients"
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
                    Patients Assigned
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    See the list of your patients.
                </Typography>
            </Box>
            <Grid container spacing={2}>
                {patients.length === 0 ? (
                    <Typography variant="body1" color="text.secondary">
                        Loading...
                    </Typography>
                ) : (
                    patients.map((patient, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index} sx={{ display: 'flex' }}>
                            <Card
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    flexGrow: 1,
                                    p: 1,
                                    backgroundColor: hoveredIndex === index ? theme.palette.action.hover : 'inherit', // Highlight background on hover
                                    cursor: 'pointer', // Set cursor to pointer
                                }}
                                onMouseEnter={() => setHoveredIndex(index)} // Set hovered index on mouse enter
                                onMouseLeave={() => setHoveredIndex(-1)}    // Reset hovered index on mouse leave
                                onClick={() => handleSelectPatient(patient)} // Call onClick event handler
                            >
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        pr: 2,
                                    }}
                                >
                                    <CardHeader
                                        avatar={<Avatar>{patient.PatientName.charAt(0)}</Avatar>}
                                        title={`${patient.PatientName}`}
                                        subheader={`Date: ${moment(patient.Date).format("MMMM Do YYYY, h:mm a")}`}
                                    />
                                    <Typography variant="body2" color="text.secondary">{`Location: ${patient.Location}`}</Typography>
                                </Box>
                            </Card>
                        </Grid>
                    ))
                )}
            </Grid>
        </Container>
    );
};

export default Patients;
