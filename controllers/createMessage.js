
/**
 * 
 * controllers/createMessage.js - Contains all logic for creating a message
 * 
 * @author Richard Williams
 */

const { response } = require("express");
const { query } = require("../db/dbService");

const createMessage = async (req, res = response) => {

    console.log(req)

    res.json({
        msg: "Successful message creation"
    });
};

module.exports = {
    createMessage
};