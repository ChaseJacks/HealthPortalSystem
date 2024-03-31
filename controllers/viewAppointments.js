
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
        const request = new sql.Request();
        request.input("doctorID", sql.NVarChar, doctorID);
        const result = await request.query("SELECT * FROM Appointment WHERE DoctorID = @doctorID");

        const finalResp = [];

        for (let i = 0; i < result.recordset.length; i++) {
            const patientID = result.recordset[i].PatientID;
            const patientRequest = new sql.Request();

            patientRequest.input('patientID', sql.NVarChar, patientID);
            const patientQuery = await docRequest.query("SELECT Name FROM Patient WHERE PatientID = @patientID");
            const patientName = patientQuery.recordset[0].Name;

            finalResp[i] = { PatientName: patientName, Location: result.recordset[i].Location, Date: result.recordset[i].Date };
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
