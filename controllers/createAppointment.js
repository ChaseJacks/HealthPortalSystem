
/**
 * 
 * controllers/createAppointment.js - Handles the logic for creating a new appointment from an HTTP request
 * 
 * @author Richard Williams
 * 
 */

const { response } = require("express");
const { query } = require("../db/dbService");

const createAppointment = async (req, res = response) => {
    
    const { patientID, doctorID, date, location } = req.body;

    // Try to make the query. If there's an issue, respond with a bad request
    try {
        await query(`INSERT INTO APPOINTMENT (AppointmentID, PatientID, DoctorID, Date, Location) VALUES
            (NEWID(), ${patientID}, ${doctorID}, ${date}, "${location}"`);
    } catch (err) {
        res.status(401).json({
            msg: "Bad query!";
        });
    }

    // Otherwise, let them know it was successful
    res.json({
        msg: "Created appointment successfully."
    });

};

module.exports = {
    createAppointment
};