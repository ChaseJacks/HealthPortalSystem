const { response } = require("express");
const { query } = require("../db/dbService");

const viewPatients = async (req, res = response) => {
    try {
        const doctorID = req.params["doctorID"];
        
        // Query to select appointments for the current doctor
        const result = await query(`
            SELECT A.PatientID, A.Date, A.Location, P.Name AS PatientName
            FROM Appointment A
            JOIN Patient P ON A.PatientID = P.PatientID
            WHERE A.DoctorID = (CONVERT(uniqueidentifier, '${doctorID}'))
        `);
        
        // Format the result to match the expected format
        const formattedResult = result.recordset.map(appointment => ({
            Date: appointment.Date,
            Location: appointment.Location,
            PatientName: appointment.PatientName,
            PatientID: appointment.PatientID
        }));
        
        res.json(formattedResult);
        

    } catch (err) {
        console.log("Error - " + err.message);
        res.status(500).json({ msg: "Error while processing request" });
    }
};

module.exports = {
    viewPatients
};