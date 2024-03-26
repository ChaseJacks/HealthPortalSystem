
/**
 * 
 * controllers/auth.js - Contains all logic for logging in
 * 
 * @author Richard Williams
 */

const { response } = require("express");
const { query } = require("../db/dbService");

const viewDoctors = async (req, res = response) => {
    const { column } = req.body
    

    const result = await query('SELECT ' + column + ' FROM Doctor');

   

    res.json(result);

    // res.json(result);
};

module.exports = {
    viewDoctors
};