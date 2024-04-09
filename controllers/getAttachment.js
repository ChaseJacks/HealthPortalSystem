
/**
 * 
 * controllers/getAttachment.js - Contains logic for serving a request file from the server
 * 
 * @author Richard Williams
 */

const { response } = require("express");
const { query } = require("../db/dbService");


const getAttachment = async (req, res = response) => {
    const { email, password } = req.body;
    
    res.json({
        msg: "Messages!"
    });
};

module.exports = {
    getAttachment
};