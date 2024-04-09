
/**
 * 
 * controllers/createMessage.js - Contains all logic for creating a message
 * 
 * @author Richard Williams
 */

const { response } = require("express");
const { query } = require("../db/dbService");
const formidable = require('formidable');
const fs = require('fs');

const createMessage = async (req, res = response) => {

    try {
        // Begin processing the form that's being sent
        var form = new formidable.IncomingForm({allowEmptyFiles: true});
        [fields, files] = await form.parse(req);

        let messageText = fields.msgText[0];
        const patientID = /*req.params["patientID"];*/ "33333333-3333-3333-3333-333333333333";
        const doctorID = /*req.params["doctorID"];*/ "a972c577-dfb0-064e-1189-0154c99310da";
        const attachment = files.attachment[0];
        const patientAuthor = req.headers.referer.includes('/MessageDoctor') ? 1 : 0;
        var filePath = "";

        // Alter messageText to accomodate the INSERT query
        if (messageText == "") {
            messageText = "NULL";
        } else {
            messageText = "'" + messageText + "'";
        }

        // Generate the msgID
        const idQuery = await query(`SELECT MAX(MessageID) AS MessageID FROM Message;`);
        //console.log(idQuery.recordset[0]);
        const msgID = idQuery.recordset[0].MessageID + 1;
        

        // If there is no attachment, change the filePath for the INSERT query
        if (!attachment) {
            filePath = "NULL";
        }

        // Otherwise, save the file in resources/:msgID/:fileName
        else {
            // Create the directory
            if (!fs.existsSync(`./resources`))
                fs.mkdirSync(`./resources`);

            fs.mkdirSync(`./resources/${msgID}/`);
            filePath = `./resources/${msgID}/${attachment.originalFilename}`;

            const readStream = fs.createReadStream(attachment.filepath);
            const writeStream = fs.createWriteStream(filePath);

            readStream.pipe(writeStream);

            writeStream.on('error', (err) => {
                console.error('Error writing file:', err);
            });

            writeStream.on('finish', () => {
                console.log('File has been successfully written to', filePath);
            });

            filePath = `/data/msg/${msgID}/${attachment.originalFilename}`;
        }

        // Do the INSERT query
        const result = await query(`INSERT INTO Message (MessageID, PatientID, DoctorID, MessageContents, Attachment, PatientAuthor)
                     VALUES (${msgID}, '${patientID}', '${doctorID}', ${messageText}, '${filePath}', ${patientAuthor});
                    `);

        console.log(result);
        
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ msg: "Unable to process request" });
        return;
    }

    res.json({
        msg: "Successful message creation"
    });
};

module.exports = {
    createMessage
};