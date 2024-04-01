
/**
 * 
 * client/src/api/viewDoctorAppointments - Contains the HTTP request to view all of a doctors appointments
 * 
 * @author Richard Williams
 * 
 */

export async function viewDoctorAppointments(doctorID) {
    return await fetch(`/doctor/${doctorID}/appointments`, {
        method: "GET",
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