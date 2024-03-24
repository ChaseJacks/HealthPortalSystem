
/**
 * 
 * client/src/api/auth.js - Contains functions relevant to what the client sends to the api/auth endpoint 
 * 
 * @author Richard Williams
 */

export async function login({ email, password }) {
    return await fetch("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
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