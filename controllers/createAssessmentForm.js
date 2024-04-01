
/**
 * 
 * controllers/createAssessmentForm - contains logic for handling an HTTP request to create a PatientAssessmentForm 
 * 
 * @author Richard Williams
 * 
 */

const { response } = require("express");
const { query } = require("../db/dbService");

const createAssessmentForm = async (req, res = response) => {

    const { patientID, patientName, patientResponse } = req.body;

    try {
        await query(`INSERT INTO PatientAssessmentForm (PatientID, PatientName, PatientResponse)
                VALUES(${patientID}, "${patientName}", "${patientResponse}")
                ON DUPLICATE KEY UPDATE PatientResponse = VALUES(PatientResponse)`);

    } catch (err) {
        res.status(401).json({
            msg: "Error inserting/updating entry!"
        });
    }

    res.json({
        msg: "Successfully inserted/updated the form."
    });
};

module.exports = {
    createAssessmentForm
};