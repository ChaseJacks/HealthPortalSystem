
/**
 * 
 * middleware/validateInput.js - A middleware dedicated to doing an express validation and checking for errors
 * 
 * @author - Richard Williams
 * @since 3/23/2024
 */


const { validationResult } = require(`express-validator`);

// Check the given request for errors
const validateInput = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
    }

    next();
};

// Export all middlewares

module.exports = {
    validateInput
}