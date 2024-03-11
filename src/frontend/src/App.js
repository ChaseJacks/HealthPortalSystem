import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PatientAssessmentForm from './PatientAssessmentForm';
import PatientHistory from './PatientHistory'
import './App.css';
import LoginPage from './loginpage.js';

// Import components
let PatientAssessmentForm = require("./components/PatientAssessmentForm/PatientAssessmentForm.js");



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
        
        <Route path="/patient-assessment" element={<PatientAssessmentForm />} />
        <Route path="/login" element = {<LoginPage />} />
        <Route path="/PatientAssessmentForm" element={<PatientAssessmentForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
