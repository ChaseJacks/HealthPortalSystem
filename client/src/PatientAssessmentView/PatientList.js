import React from 'react';

function PatientList() {
  // Predefined list of patients 
  //We can replace this with all the fetch requests for the 
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
