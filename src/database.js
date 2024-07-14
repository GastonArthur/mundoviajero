const mysql = require("promise-mysql");
const dotenv = require("dotenv");
dotenv.config();

const connection = mysql.createConnection({
    host: '127.0.0.1', // IPv4 para localhost
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
});

const getConnection = async () => await connection;

module.exports = {
    getConnection
};
