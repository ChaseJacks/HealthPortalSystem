
/**
 * 
 * models/server.js - Dyanmically sets up routes, middleware, and controllers using a server class.
 * @author Richard Williams
 * @since 3/23/2024
 * 
 */

// Dependences
const { query } = require("../db/dbService");
const express   = require('express');
const cors      = require('cors');
const fs        = require('fs');
const path      = require('path');

// Class Declaration

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.paths = {
            auth: "/auth",
            viewDoctors: "/viewDoctors",
            viewPatientAssessmentForm: "/viewPatientAssessmentForm",
            createPatientAssessmentForm: "/createPatientAssessmentForm",
            viewAppointments: "/viewAppointments",
            createAppointment: "/createAppointment",
            createUser: "/createUser"
        };

        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.app.use(cors()); // Enable CORS
        this.app.use(express.json());

        // This is where we pick up the React app
        this.app.use(
            express.static(path.join(__dirname, "../client/build"))
        );
    }

    // Bind back-end routers to the app
    routes() {
        this.app.use(this.paths.auth, require("../routes/auth"));
        this.app.use(this.paths.viewDoctors, require("../routes/viewDoctors"));
        this.app.use(this.paths.viewPatientAssessmentForm, require("../routes/viewPatientAssessmentForm"));
        this.app.use(this.paths.createPatientAssessmentForm, require("../routes/createPatientAssessmentForm"));
        this.app.use(this.paths.viewAppointments, require("../routes/viewAppointments"));
        this.app.use(this.paths.createAppointment, require("../routes/createAppointment"));
        this.app.use(this.paths.createUser, require("../routes/createUser"));

        // Catch all requests that don't match any route
        this.app.get("*", (req, res) => {
            res.sendFile(
                path.join(__dirname, "../client/build/index.html")
            );
        });
    }

    listen() {
        this.app.listen(this.port, async() => {
            console.log("Running on port ", this.port);

            //testing
            //console.log(await query('SELECT ' + 'name, specialization' + ' FROM Doctor');)
            //console.log(await query(`INSERT INTO Users VALUES (NEWID(), 'rich@rich.com', 'abcd',0)`));
        })
    }
}

module.exports = Server;
