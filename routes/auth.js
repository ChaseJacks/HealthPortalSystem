
/**
 * 
 * routes/auth.js - Contains the router for the /auth path. Meant for logging in users.
 * 
 * @author Richard Williams
 * 
 */

// Setup router
const { Router } = require('express');
const router = Router();

// ---------- Middleware

const { check } = require('express-validator');
const { validateInput } = require('../middleware/validateInput');

// ---------- Routes

// login

const { login } = require('../controllers/auth');
router.post('/login', [
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    validateInput
], login);

// Export 

module.exports = router;