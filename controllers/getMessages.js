
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

        const msgArr = await query(`
            WITH RankedMessages AS (
                SELECT *,
                ROW_NUMBER() OVER (ORDER BY MessageID DESC) AS RowNum
                FROM Message
                WHERE PatientID = 'your_patient_id_value' -- specify the patient ID
                AND DoctorID = 'your_doctor_id_value'   -- specify the doctor ID
            )
            SELECT *
            FROM RankedMessages
            WHERE RowNum <= N; -- specify the desired value for N
        `);
        console.log(msgArr);
        console.log("RAAAA");

    } catch (err) {
        res.status(500).json({
            err: "Failed query!"
        });
    }
    
    res.json({
        msg: "Messages!"
    });
};

module.exports = {
    getMessages
};