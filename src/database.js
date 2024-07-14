const mysql = require("promise-mysql");
const dotenv = require("dotenv");
dotenv.config();

const pool = mysql.createPool({
    host: process.env.host,
    database:process.env.database,
    user:process.env.user,
    password:process.env.password,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
})

module.exports = pool;