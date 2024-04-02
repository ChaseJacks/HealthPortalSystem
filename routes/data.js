
/**
 * 
 * routes/data.js - Contains the router for the /data path. 
 *		This path is responsible for directly retrieving data from the database.
 *		Use GET methods whenever possible.
 *	
 * @author Richard Williams
 * 
 */

// Setup router
const { Router } = require('express');
const router = Router();

// --------- Middleware
const { validateInput } = require('../middleware/validateInput');

// --------- Routes

// viewAppointments

const { viewAppointmentsPatient, viewAppointmentsDoctor } = require("../controllers/viewAppointments");
router.get("/patient/:patientID/appointments", [
    validateInput
], viewAppointmentsPatient);

router.get("/doctor/:doctorID/appointments", [
    validateInput
], viewAppointmentsDoctor);

// viewDoctors

const { viewDoctors } = require('../controllers/viewDoctors');
router.get("/viewDoctors", [
    validateInput
], viewDoctors);

//View Patients that a doctor has 
const { viewPatients } = require('../controllers/viewPatients');
router.get("/doctor/:doctorID/viewPatients", [
    validateInput
], viewPatients);

// viewAssessmentForm

const { viewAssessmentForm } = require('../controllers/viewAssessmentForm');
router.get("/patient/:patientID/assessmentForm", [
    validateInput
], viewAssessmentForm);

// Export

module.exports = router;