
/**
 * 
 * controllers/auth.js - Contains all logic for logging in
 * 
 * @author Richard Williams
 */

const { response } = require("express");

const login = async (req, res = response) => {
    const { email, password } = req.body;

    // TODO implement a database search

    if (password !== "1234") {
        return res.status(400).json({
            msg: "User / Password are incorrect",
        });
    }

    res.json({
        name: "TestUser",
        email: email,
        token: "Do we want to use a token in the local storage to keep them logged in? Use cookies for it perhaps?",
        msg: "Successful login",
    });
};

module.exports = {
    login
};