/**
 * 
 * routes/auth.js - Contains the router for authorization. This endpoint is used for viewing patient forms
 * 
 * 
 * 
 */


const { Router } = require('express');
const router = Router();

const { viewPatientAssessmentForm } = require('../controllers/viewPatientAssessmentForm')
const { validateInput } = require('../middleware/validateInput');

//const { check } = require('express-validator');
//const { validateInput } = require('../middleware/validateInput');
//const { login } = require('../controllers/auth');

/*router.post('/login', [
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    validateInput
], login);*/

router.post('/viewPatientAssessmentForm', [
    validateInput
], viewPatientAssessmentForm)


module.exports = router;