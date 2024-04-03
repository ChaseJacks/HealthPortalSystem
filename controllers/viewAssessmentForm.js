
/**
 * 
 * controllers/viewAssessmentForm - Contains logic for retrieving a patient's assessment form
 * 
 * @author Richard Williams
 * 
 */

const { response } = require("express");
const { query } = require("../db/dbService");

const viewAssessmentForm = async (req, res = response) => {

    try {
        const patientID = req.params["patientID"];
        const result = await query(`SELECT * FROM PatientAssessmentForm WHERE PatientID=(CONVERT(uniqueidentifier, '${patientID}'))`);
        //The query is good, it returns what we need to return
        res.json(result.recordset[0]);
    } catch (err) {
        console.log("Error - " + err.message);
        res.status(500).json({msg: "Error retrieving patient assessment form"});
    }
};

module.exports = {
    viewAssessmentForm
};