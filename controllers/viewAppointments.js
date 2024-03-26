const { response } = require("express");
const { query } = require("../db/dbService");
const sql = require("mssql");

const viewAppointments = async (req, res = response) => {
    try {
        const { patientID } = req.body;
        

        const request = new sql.Request();
        request.input('patientID', sql.NVarChar, patientID);

        const result = await request.query('SELECT * FROM Appointment WHERE PatientID = @patientID');
        

        const finalResp = [];

        for (let i = 0; i < result.recordset.length; i++) {
            const doctorID = result.recordset[i].DoctorID;
            

            const docRequest = new sql.Request();
            docRequest.input('doctorID', sql.NVarChar, doctorID);
            const docQuery = await docRequest.query('SELECT Name FROM Doctor WHERE DoctorID = @doctorID');
            

            const docName = docQuery.recordset[0].Name;
            finalResp[i] = { DoctorName: docName, Location: result.recordset[i].Location, Date: result.recordset[i].Date };
        }

        res.json(finalResp);
    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({ error: "An error occurred while processing the request." });
    }
};

module.exports = {
    viewAppointments
};
