
/**
 * 
 * index.js - Driver code for the backend.
 * @author Richard Williams
 * @since 3/5/2024
 *
 */

require('dotenv').config();
const Server = require('./models/server');

const serverInstance = new Server();
serverInstance.listen();