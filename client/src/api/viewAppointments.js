/**
 * 
 * client/src/api/viewAppointments.js - The HTTP request that is needed to access viewAppointmnets endpoint
 * 
 * @author Richard Williams
 */

export async function viewAppointments(patientID) {
    return await fetch("/viewAppointments", {
        method: "POST",
        body: JSON.stringify({ patientID }),
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