
/**
 * 
 * controllers/createUser.js - An endpoint to sign in a user.
 * 
 * @author Richard Williams
 */

const { response } = require("express");
const { query } = require("../db/dbService");

const createUser = async (req, res = response) => {
    const { firstName, lastName, email, password } = req.body;

    const existQuery = await query(`SELECT COUNT(*) AS count FROM User WHERE Username=${email}`);
    let count = existQuery.recordset[0].count;

    // If the email exists, dont make the account
    if (count != 0) {
        return res.status(401).json({
            msg: "Email already taken",
        });
    }

    // Insert the new user
    await query(`INSERT INTO Users VALUES (NEWID(), '${email}', '${password}',0)`));
    const userID = await query(`SELECT UserID FROM Users WHERE Username == '${email}'`).recordset[0].UserID;
    await query(`INSERT INTO Patient (PatientID, Name, UserID) VALUES (NEWID(), '${firstName + lastName}', '${userID}'`);
    const patientID = await query(`SELECT PatientID FROM Patient WHERE UserID='${ userID }'`).recordset[0].PatientID;

    // With a successful signup, send back {userID, isAdmin = 0, PatientID}
    res.json({
        userID: userID,
        isAdmin: 0,
        patientID: patientID
    });
};

module.exports = {
    createUser
};