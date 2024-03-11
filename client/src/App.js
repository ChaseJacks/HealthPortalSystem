import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import SignUp from './sign-up/SignUp.js'
import HomePage from './HomePage.js'
import SignIn from './sign-in/SignIn.js';
import LandingPage from './landing-page/LandingPage.js';

// Import components
let PatientAssessmentForm = require("./components/PatientAssessmentForm/PatientAssessmentForm.js");
let PatientHistory = require("./components/PatientHistory/PatientHistory.js");


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
        <Route path="/login" element={<SignIn />} />
        <Route path="/Signup" element={<SignUp />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/PatientAssessmentForm" element={<PatientAssessmentForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
