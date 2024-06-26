import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import SignUp from './sign-up/SignUp.js'
import HomePage from './HomePage.js'
import SignIn from './sign-in/SignIn.js';
import LandingPage from './landing-page/LandingPage.js';
import PatientAssessmentForm from './components/PatientAssessmentForm/PatientAssessmentForm.js'
import ScheduleAppointmentPage from './landing-page/components/ScheduleAppointment.js';
import Appointments from './components/Appointments.js';
import DoctorLand from './DoctorLand/DoctorLand.js';
import PatientAssessmentView from './PatientAssessmentView/PatientAssessmentView.js';
import ManageAppointments from './DoctorLand/ManageAppointments.js';
import DoctorChat from './Messaging/DoctorChat.js';
import PatientChat from './Messaging/PatientChat.js';

//Author @ Chase jackson 
//This is where all the routes are determined

function App() {
  
    const [backendData, setBackendData] = useState(null);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      fetch("/api")
        .then(response => response.json())
        .then(data => {
          setBackendData(data);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
          setLoading(false);
        });
    }, []);
  
    if (loading) {
      return <div>Loading...</div>;
    }
 
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<HomePage />} />
        <Route path="/Appointments" element = {<Appointments/>} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/PatientAssessmentForm" element={<PatientAssessmentForm />} />
        <Route path = "/ScheduleAppointment" element = {<ScheduleAppointmentPage />} />
        <Route path="/DoctorLand" element={<DoctorLand />} />
        <Route path = "/ViewPatientAssessments" element={ <PatientAssessmentView /> } />
        <Route path="/ManageAppointments" element={<ManageAppointments />} />
        <Route path = "/MessagePatient" element = {<DoctorChat /> } />
        <Route path = "/MessageDoctor" element = {<PatientChat /> } />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
