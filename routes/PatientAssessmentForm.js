
/**
 * 
 * routes/PatientAssessmentForm.js
 * 
 * The router for the PatientAssessmentForm component
 * @author Richard Williams
 * @since 3/10/2024
 * 
 */

const { Router } = require("express");
const router = Router();

const { submitForm } = require('../controllers/PatientAssessmentForm');

router.post('/PatientAssessmentForm', [

], submitForm);

module.exports = router;