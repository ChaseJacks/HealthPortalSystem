
/**
 * 
 * controllers/viewDoctors.js - Contains logic for viewing a list of all doctors
 * 
 * @author Richard Williams
 * 
 */

const { response } = require("express");
const { query } = require("../db/dbService");

const viewDoctors = async (req, res = response) => {
    try {
        const result = await query("SELECT Name, Specialization FROM Doctor");
        res.json(result);
    } catch (err) {
        console.log("Error - " + err.message);
        res.status(500).json({ msg: "Error retrieving data." });
    }
};

module.exports = {
    viewDoctors
};