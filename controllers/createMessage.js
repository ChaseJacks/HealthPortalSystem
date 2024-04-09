
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
        // const patientID = req.params["patientID"];
        // const doctorID = req.params["doctorID"];
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
        console.log(idQuery.recordset[0]);
        const msgID = idQuery.recordset[0].MessageID + 1;

        // If there is no attachment, change the filePath for the INSERT query
        if (!attachment) {
            filePath = "NULL";
        }

        // Otherwise, save the file in resources/:msgID/:fileName
        else {
            filePath = `../resources/${msgID}/${attachment.originalFilename}`;
            console.log(attachment);

            // TODO this is where I need to actually save the attachment into
            // /resources/:msgID/:originalFilename

            // The issue is that everything in `fs` takes in only a buffer, but
            // attachment is type PersistentFile. I cannot figure out how to save a persistent file
            // I tried using the `C:/.../AppData/tmp/fileName` to access it raw when it recieves it in memory,
            // but it is no longer a path by the time I try using it.
            // Everything I've seen online uses a renaming of the file, but it still requires a buffer!

            filePath = `data/msg/${msgID}/${attachment.originalFileName}`;
        }

        // Do the INSERT query
        /*await query(`INSERT INTO Message (MessageID, PatientID, DoctorID, MessageContents, Attachment, PatientAuthor)
                     VALUES (${msgID}, '${patientID}', '${doctorID}', ${messageText}, ${filePath}, ${patientAuthor});
                    `)*/
        
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