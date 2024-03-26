
/**
 * 
 * client/src/api/viewDoctors.js - The HTTP request that is needed to use the viewDoctors endpoint
 * 
 * @author Richard Williams
 */

export async function viewDoctors({ column }) {
    return await fetch("/createUser", {
        method: "POST",
        body: JSON.stringify({ column }),
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