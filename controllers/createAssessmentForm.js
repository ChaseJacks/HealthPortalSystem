
/**
 * 
 * controllers/createAssessmentForm - contains logic for handling an HTTP request to create a PatientAssessmentForm 
 * 
 * @author Richard Williams
 * 
 */

const { response } = require("express");
const { query } = require("../db/dbService");

const createPatientAssessmentForm = async (req, res = response) => {
    /*const { column1, column2, column3 } = req.body
    //column1 = column1.toUppercase();

    let column  = column1 + ',' + column2 + ',' + column3

    const result = await query('INSERT INTO PatientAssessmentForm VALUES (' + column + ');');

    res.json(result);

    // res.json(result);*/

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
    createPatientAssessmentForm
};