const mysql = require("promise-mysql");
const dotenv = require("dotenv");
dotenv.config();

const connection = mysql.createConnection({
    host: process.env.host,
    port: process.env.port || 3306,
    database: process.env.database,
    user: process.env.user,
    password: process.env.password 
});

const getConnection = async () => await connection;

module.exports = {
    getConnection
};
