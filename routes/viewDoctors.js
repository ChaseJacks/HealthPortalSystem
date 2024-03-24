
/**
 * 
 * routes/auth.js - Contains the router for authorization. This endpoint is used for logging in and out
 * 
 * 
 * 
 */


const { Router } = require('express');
const router = Router();

const { viewDoctors } = require('../controllers/viewDoctors')
const { validateInput } = require('../middleware/validateInput');

//const { check } = require('express-validator');
//const { validateInput } = require('../middleware/validateInput');
//const { login } = require('../controllers/auth');

/*router.post('/login', [
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    validateInput
], login);*/

router.get('/viewDoctors', [
    validateInput
], viewDoctors)


module.exports = router;