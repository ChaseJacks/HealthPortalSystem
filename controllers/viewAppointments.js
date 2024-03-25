const { response } = require("express");
const { query } = require("../db/dbService");

const viewAppointments = async (req, res = response) => {
    const { column } = req.body
    column = column.toUppercase();

    const result = await query('SELECT * FROM Appointment WHERE PatientID =' + column + ';');

    res.json(result);

    // res.json(result);
};

module.exports = {
    viewAppointments
};