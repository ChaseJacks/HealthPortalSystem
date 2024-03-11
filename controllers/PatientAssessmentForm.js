
/**
 * 
 * controllers/PatientAssessmentForm.js
 * 
 * 
 * The controller for the PatientAssessmentForm component
 * @author Richard Williams
 * @since 3/10/2024
 */

const { response } = require("express");

const submitForm = async (req, res = response) => {
    // const { formDataVar1, formDataVar2, etc. } = req.body

    res.json({
        msg: "Successful submission",
    });
};

module.exports = {
    submitForm
};