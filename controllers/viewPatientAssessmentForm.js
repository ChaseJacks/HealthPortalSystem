const { response } = require("express");
const { query } = require("../db/dbService");

const viewPatientAssessmentForm = async (req, res = response) => {
    const { column } = req.body


    const result = await query('SELECT' + column +  'FROM PatientAssessmentForm;');

    res.json(result);

    // res.json(result);
};

module.exports = {
    viewPatientAssessmentForm
};