/**
 * 
 * client/src/api/viewDoctors.js - The HTTP request that is needed to use the viewPatients endpoint
 * 
 * @author Chase Jackson
 */

export async function viewPatients(doctorID) {
    return await fetch(`/data/doctor/${doctorID}/viewPatients`, {
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