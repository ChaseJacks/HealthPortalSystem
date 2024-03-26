const { response } = require("express");
const { query } = require("../db/dbService");

const viewAppointments = async (req, res = response) => {
    const { column } = req.body
    column = column.toUppercase();

    let result = await query('SELECT * FROM Appointment WHERE PatientID =' + column + ';');

    for (let i = 0; i < result.recordset; i++) {
        let doctorID = result.recordset[i].DoctorID;
        // Get the name of the doctor
        let docQuery = await query('SELECT Name FROM Doctor WHERE DoctorID =' + doctorID);
        let docName = docQuery.recordset[0].Name;
        result.recordset[i].DoctorID = docName;
    }

    res.json(result);

    // res.json(result);
};

module.exports = {
    viewAppointments
};