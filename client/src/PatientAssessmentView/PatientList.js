import React from 'react';

import { viewDoctorAppointments } from './../api/viewDoctorAppointments';

function PatientList() {
  // Predefined list of patients 
  //We can replace this with all the fetch requests for the 

    /**
     * 
     * HOW TO USE viewDoctorAppointments
     * 
     * Inside an async function...
     * 
     * const doctorID = localStorage.getItem("userTypeID");
     * const appointments = await viewDoctorAppointments(doctorID);
     * 
     * appointments looks like...
     * 
     * appointments: {
     *      [
     *          {PatientID: patientID, PatientName: patientName, Location: location, Date: date},
     *          {...},
     *          {...},
     *          ...
     *      ]   
     * }
     * 
     * Process that as needed to extract unique patient names (probably mapped to their patientIDs)
     * Not quite sure if UUIDs can be used to map the buttons, like done in
     *      <button key={patient.id} onClick={() => ...}>
     * 
     * If not, just use an accumulator to add to `patients`, something to the effect of
     * patients.append({ id: patients[patients.length].id + 1, name: result[i].PatientName})
     * 
     * (please dont use that because you have to make sure they're unique before you look through the array of `appointments`
     *      like that)
     */

  const patients = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' },
    { id: 3, name: 'Michael Johnson' },
    { id: 4, name: 'Emily Brown' }
  ];

  // Function to handle clicking on a patient button
  //I think this is where you would have the button take you to a specific form
  const handlePatientClick = (patient) => {
    alert(`Patient ${patient.name} clicked!`);
    // You can replace alert with any action you want
  };

  return (
    <div>
      <h1>Patients List</h1>
      <div style={ { display: 'flex', flexDirection: 'column', gap: '10px '} }>
        {patients.map((patient) => (
          <button key={patient.id} onClick={() => handlePatientClick(patient)}>
            {patient.name}
          </button>
        ))}
      </div>
    </div>
  );
}

export default PatientList;
