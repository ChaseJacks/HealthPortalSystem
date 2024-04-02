/**
 * 
 * client/src/api/createAppointment - Contains the HTTP request to create a given appointment
 * 
 * @author Richard Williams
 * 
 */

export async function createAppointment(patientID, doctorID, date, location) {
    return await fetch("/create/appointment", {
        method: "POST",
        body: JSON.stringify({ patientID: patientID, doctorID: doctorID, date: date, location: location }),
        headers: { "Content-Type": "application/json" }
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