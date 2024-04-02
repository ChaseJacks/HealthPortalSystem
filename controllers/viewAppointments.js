
/**
 * 
 * controllers/viewAppointments - Contains all the logic for viewing appointments scheduled for a doctor/patient
 * 
 * @author Richard Williams
 * 
 */

const { response } = require("express");
const { query } = require("../db/dbService");
const sql = require("mssql");

const viewAppointmentsPatient = async (req, res = response) => {
    try {
        const patientID = req.params["patientID"];
        const request = new sql.Request();
        request.input("patientID", sql.NVarChar, patientID);
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

    } catch (err) {
        console.log("Error - " + err.message);
        res.status(500).json({ msg: "Error while processing request" });
    }
};

const viewAppointmentsDoctor = async (req, res = response) => {
    try {

        const doctorID = req.params["doctorID"];
        const result = await query(`SELECT * FROM Appointment WHERE DoctorID = (CONVERT(uniqueidentifier, '${doctorID}'))`);

        const finalResp = [];

        for (let i = 0; i < result.recordset.length; i++) {
            const patientID = result.recordset[i].PatientID;
            const patientResult = await query(`SELECT * FROM Patient WHERE PatientID = (CONVERT(uniqueidentifier, '${patientID}'))`);
            const patientName = patientResult.recordset[i].Name;

            finalResp[i] = {
                PatientID: patientID,
                PatientName: patientName,
                Location: result.recordset[i].Location,
                Date: result.recordset[i].Date
            };
            
        }
        
        
        res.json(finalResp);

    } catch (err) {
        console.log("Error - " + err.message);
        res.status(500).json({ msg: "Error while processing request" });
    }
}

module.exports = {
    viewAppointmentsPatient,
    viewAppointmentsDoctor
};
