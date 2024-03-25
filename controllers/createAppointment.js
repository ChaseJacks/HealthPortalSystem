const { response } = require("express");
const { query } = require("../db/dbService");

const createAppointment = async (req, res = response) => {
    const { column1, column2, column3, column4, column5 } = req.body
    //column1 = column1.toUppercase();

    let column  = column1 + ',' + column2 + ',' + column3 + ',' + column4 + ',' + column5

    const result = await query('INSERT INTO Appointment VALUES (' + column + ');');

    res.json(result);

    // res.json(result);
};

module.exports = {
    createAppointment
};