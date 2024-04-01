
/**
 * 
 * client/src/api/createAssessmentForm - Contains the HTTP request to create an assessment form for a patient
 * 
 * @author Richard Williams
 * 
 */

export async function createAssessmentForm(patientID, patientName, patientResponse) {
    return await fetch("/create/assessmentForm", {
        method: "POST",
        body: JSON.stringify({ patientID, patientName, patientResponse }),
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