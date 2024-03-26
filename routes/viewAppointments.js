/**
 * 
 * routes/viewAppoints.js - Router used for viewing all appointments through the database
 * 
 * @author Richard Williams
 * 
 */


const { Router } = require('express');
const router = Router();

const { viewAppointments } = require('../controllers/viewAppointments')
const { validateInput } = require('../middleware/validateInput');

router.post('/', [
    validateInput
], viewAppointments)


module.exports = router;