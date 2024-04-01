/**
 * 
 * client/src/api/viewPatientAppointments.js - The HTTP request that is needed to view patient appointments
 * 
 * @author Richard Williams
 */

export async function viewAppointments(patientID) {
    return await fetch(`/data/patient/${patientID}/appointments`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    })
        .then((response) => {
            // If request is not successful, display error message
            if (!response.ok) {
                throw new Error("HTTP status " + response.status);
            }

            return response.json();
        })
        .catch((err) => {
            console.log(err);
        });
}