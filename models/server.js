
/**
 * 
 * models/server.js - Dyanmically sets up routes, middleware, and controllers using a server class.
 * @author Richard Williams
 * @since 3/5/2024
 * 
 */

// Dependences
const express   = require('express');
const cors      = require('cors');
const fs        = require('fs');
const path      = require('path');

// Class Declaration

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        /*this.paths = {
            auth: "api/auth",
            homepage: "/api/homepage"
        };*/

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

    // Bind routers to the app
    routes() {

        // Dynamically read all routers and make the app use them

        fs.readdirSync('./routes/').forEach((file) => {
            this.app.use(path.parse(file).name, require(`../routes/${file}`));
        });

        /*this.app.use(this.paths.auth, require("../routes/auth"));
        this.app.use(this.paths.homepage, require("../routes/homepage"));*/
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log("Running on port ", this.port);
        })
    }
}

module.exports = Server;