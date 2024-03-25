
/**
 * 
 * routes/createUser.js - The endpoint used to create Patient accounts
 * 
 */

const { Router } = require('express');
const router = Router();

const { check } = require('express-validator');
const { validateInput } = require('../middleware/validateInput');
const { createUser } = require('../controllers/createUser.js');

router.post('/', [
    check('firstName', 'First Name is Required').not().isEmpty(),
    check('lastName', 'Last Name is Required').not().isEmpty(),
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    validateInput
], createUser);

module.exports = router;