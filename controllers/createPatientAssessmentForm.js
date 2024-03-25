const { response } = require("express");
const { query } = require("../db/dbService");

const createPatientAssessmentForm = async (req, res = response) => {
    const { column1, column2, column3 } = req.body
    //column1 = column1.toUppercase();

    let column  = column1 + ',' + column2 + ',' + column3

    const result = await query('INSERT INTO PatientAssessmentForm VALUES (' + column + ');');

    res.json(result);

    // res.json(result);
};

module.exports = {
    createPatientAssessmentForm
};