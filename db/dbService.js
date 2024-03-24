
/**
 * 
 * dbService.js - Dedicated to centralizing all queries between the back end and our database
 * 
 * @author Richard Williams
 * 
 */

let sql = require(`mssql`)

const sqlConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    server: process.env.DB_SERVER,
    database: process.env.DB_NAME, // better stored in an app setting such as process.env.DB_NAME
    authentication: {
        type: 'default'
    },
    options: {
        encrypt: true
    }
}

async function query(myQuery) {
    try {
        await sql.connect(sqlConfig);
        return await sql.query(myQuery);
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    query
}