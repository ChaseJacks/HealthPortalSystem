
/**
 * 
 * controllers/getAttachment.js - Contains logic for serving a request file from the server
 * 
 * @author Richard Williams
 */

const { response } = require("express");
const path = require('path');

const fs = require('fs');

const getAttachment = async (req, res = response) => {

    try {

        const msgID = req.params["msgID"];

        let filePath = `./resources/${msgID}/`;
        const fileExists = fs.existsSync(filePath);

        if (!fileExists) {
            res.status(404).json({
                err: "File not found - No attachment"
            });
        }

        const files = fs.readdirSync(filePath);
        filePath = path.join(__dirname, `../resources/${msgID}`, files[0])
        res.sendFile(filePath);


    } catch (err) {
        console.log(err.message);
        res.status(404).json({
            err: "File not found"
        });
    }
};

module.exports = {
    getAttachment
};