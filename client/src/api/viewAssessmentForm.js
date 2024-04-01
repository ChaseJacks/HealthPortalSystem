/**
 * 
 * client/src/api/viewDoctors.js - The HTTP request that is needed to use the viewDoctors endpoint
 * 
 * @author Richard Williams
 */

export async function viewAssessmentForm(patientID) {
    return await fetch(`/data/patient/${patientID}/assessmentForm`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    })
    .then((response) => {
        // If request is not successful, display error message
        if (!response.ok) {
            throw new Error("HTTP status " + response.status);
        }

        // response.json() : {PatientID: ..., PatientName: ..., PatientResponse: "..."};

        const result = response.json();
        const finalResp = { PatientID: result.PatientID, PatientName: result.patientName, PatientResponse: JSON.parse(result.PatientResponse) };

        return finalResp;
    })
    .catch((err) => {
        console.log(err);
    });
}