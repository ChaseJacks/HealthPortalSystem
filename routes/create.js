
/**
 * 
 * routes/create.js - Contains router for the /create path.
 *      This is used for INSERT operations in the database, specifically for
 *          creating new users, submitting patient forms, and appointments.
 *          These use the /newUser, /assessmentForm, and /appointment paths respectively.
 * 
 * @author Richard Williams
 * 
 */


// Setup the Router
const { Router } = require('express');
const router = Router();

// --------- Middleware

const { validateInput } = require('../middleware/validateInput');
const { check } = require('express-validator');
const formidable = require('express-formidable');

// --------- Routes

// createUser

const { createUser } = require("../controllers/createUser");
router.post("/newUser", [
    check('firstName', 'First Name is Required').not().isEmpty(),
    check('lastName', 'Last Name is Required').not().isEmpty(),
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    validateInput
], createUser);

// createAppointment

const { createAppointment } = require("../controllers/createAppointment");
router.post("/appointment", [
    validateInput
], createAppointment);

// createPatientAssessmentForm

const { createAssessmentForm } = require("../controllers/createAssessmentForm");
router.post("/assessmentForm", [
    validateInput
], createAssessmentForm);

// createMessage
const { createMessage } = require("../controllers/createMessage");
router.post("/msg/", [
    validateInput,formidable
], createMessage);

// Export

module.exports = router;