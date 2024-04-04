
/**
 * 
 * controllers/createUser.js - An endpoint to sign in a user.
 * 
 * @author Richard Williams
 */

const { response } = require("express");
const { query } = require("../db/dbService");

const crypto = require("crypto");

const createUser = async (req, res = response) => {
    const { firstName, lastName, email, password } = req.body;
    const name = firstName + " " + lastName
    const hashedPass = crypto.createHash('md5').update(password).digest('hex');

    const existQuery = await query(`SELECT COUNT(*) AS count FROM Users WHERE Username='${email}'`);
    console.log(existQuery)
    let count = existQuery.recordset[0].count;

    // If the email exists, dont make the account
    if (count != 0) {
        return res.status(401).json({
            msg: "Email already taken",
        });
    }

    // Insert the new user
    await query(`INSERT INTO Users VALUES (NEWID(), '${email}', '${hashedPass}',0)`);
    const userIDQuery = await query(`SELECT UserID FROM Users WHERE Username = '${email}'`);
    console.log(userIDQuery)
    const userID = userIDQuery.recordset[0].UserID;
    await query(`INSERT INTO Patient (PatientID, Name, UserID) VALUES (NEWID(), '${firstName + lastName}', '${userID}')`);
    const patientIDQuery = await query(`SELECT PatientID FROM Patient WHERE UserID = '${ userID }'`);
    console.log(patientIDQuery)
    const patientID = patientIDQuery.recordset[0].PatientID;

    // With a successful signup, send back {userID, isAdmin = 0, PatientID}
    res.json({
        userID: userID,
        isAdmin: 0,
        patientID: patientID,
        name: name
    });
};

module.exports = {
    createUser
};
