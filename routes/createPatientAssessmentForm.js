
/**
 * 
 * routes/auth.js - Contains the router for authorization. This endpoint is used for creating patient assessment forms
 * 
 * 
 * 
 */


const { Router } = require('express');
const router = Router();

const { createPatientAssessmentForm } = require('../controllers/createPatientAssessmentForm')
const { validateInput } = require('../middleware/validateInput');

//const { check } = require('express-validator');
//const { validateInput } = require('../middleware/validateInput');
//const { login } = require('../controllers/auth');

/*router.post('/login', [
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    validateInput
], login);*/

router.post('/createPatientAssessmentForm', [
    validateInput
], createPatientAssessmentForm)


module.exports = router;