
/**
 * 
 * controllers/auth.js - Contains all logic for logging in
 * 
 * @author Richard Williams
 */

const { response } = require("express");
const { query } = require("../db/dbService");

const crypto = require('crypto');

const login = async (req, res = response) => {
    const { email, password } = req.body;
    const hashedPass = crypto.createHash('md5').update(password).digest('hex');

    // Get whether or not it's ood credentials
    let result = await query("SELECT * FROM Users WHERE Username='" + email + "' AND Password='" + hashedPass + "'");

    if (!result.recordset[0]) {
        return res.status(401).json({
            msg: "User / Password are incorrect",
        });
    }

    // Extract data from the row to send back
    // We send {userID, isAdmin, userTypeID}
    let row = result.recordset[0];

    const userID = row.UserID;
    const isAdmin = row.isAdmin;

    var userType;
    switch (isAdmin) {
        case 0:
            userType = "Patient";
            break;
        case 1:
            userType = "Doctor";
            break;
        default:
            return res.status(404).json({
                msg: "Bad Database Entry",
            });
    }

    const userTypeIDQuery = await query(`SELECT ${userType}ID, Name from ${userType} WHERE UserID='${userID}'`);
    let userTypeID = userTypeIDQuery.recordset[0][`${userType}ID`];
    let name = userTypeIDQuery.recordset[0][`Name`];
    
    res.json({
        userID: userID,
        isAdmin: isAdmin,
        userTypeID: userTypeID,
        name: name
    });
};

module.exports = {
    login
};