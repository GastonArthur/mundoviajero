const mysql = require('mysql2/promise');
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

module.exports = {
    getConnection: async function () {
        try {
            const connection = await pool.getConnection();
            return connection;
        } catch (error) {
            console.error('Error al conectar con la base de datos:', error);
            throw error;
        }
    }
};