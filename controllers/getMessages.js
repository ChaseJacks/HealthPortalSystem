
/**
 * 
 * controllers/getMessages.js - Contains all logic for getting some number of messages from the database
 * 
 * @author Richard Williams
 */

const { response } = require("express");
const { query } = require("../db/dbService");


const getMessages = async (req, res = response) => {
    const patientID = req.params["patientID"];
    const doctorID = req.params["doctorID"];

    let numMessages = req.query.num;

    // Default the number of returned messages to 20
    if (!numMessages)
        numMessages = 20;

    try {

        const msgQuery = await query(`
            WITH RankedMessages AS (
                SELECT *,
                ROW_NUMBER() OVER (ORDER BY MessageID DESC) AS RowNum
                FROM Message
                WHERE PatientID = '${patientID}'
                AND DoctorID = '${doctorID}'
            )
            SELECT *
            FROM RankedMessages
            WHERE RowNum <= ${numMessages}; 
        `);
        let msgArr = msgQuery.recordset;

        for (let i = 0; i < msgArr.length; i++) {
            let msg = msgArr[i].MessageContents;
            msg = msg.replaceAll("|||", "'");
            msgArr[i].MessageContents = msg;
        }

        res.json({
            msgArr: msgArr
        });

    } catch (err) {
        console.log(err.message);
        res.status(500).json({
            err: "Failed query!"
        });
    }
;
};

module.exports = {
    getMessages
};