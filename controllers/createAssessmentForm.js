
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
        await query(`
            MERGE INTO PatientAssessmentForm AS target
            USING (VALUES (CONVERT(uniqueidentifier, '${patientID}'), '${patientName}', '${patientResponse}'))
            AS source (PatientID, PatientName, PatientResponse)
            ON target.PatientID = source.PatientID
            WHEN MATCHED THEN
                UPDATE SET target.PatientResponse = source.PatientResponse
            WHEN NOT MATCHED THEN
                INSERT (PatientID, PatientName, PatientResponse)
                VALUES (source.PatientID, source.PatientName, source.PatientResponse);
            `);

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