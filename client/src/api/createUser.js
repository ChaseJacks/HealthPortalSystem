
/**
 * 
 * client/src/api/createUser.js - Makes the HTTP request to the backend to create the user
 * 
 * @author Richard Williams
 */

export async function createUser({ firstName, lastName, email, password }) {
    return await fetch("/createUser", {
        method: "POST",
        body: JSON.stringify({ firstName, lastName, email, password }),
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