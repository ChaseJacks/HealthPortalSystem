
/**
 * 
 * routes/viewDoctors.js - An endpoint to make database requests for a list of doctors
 * 
 */


const { Router } = require('express');
const router = Router();

const { viewDoctors } = require('../controllers/viewDoctors')
const { validateInput } = require('../middleware/validateInput');

router.post('/', [
    validateInput
], viewDoctors)


module.exports = router;