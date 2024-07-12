const mysql = require("promise-mysql");
const dotenv = require("dotenv");
dotenv.config();

const pool = mysql.createPool({
    host: process.env.host,
    database: process.env.database,
    user: process.env.user,
    password: process.env.password 
});

const getConnection = async () => {
    try {
        const connection = await pool.getConnection();
        return connection;
    } catch (error) {
        console.error('Error al conectar con la base de datos:', error);
        throw error; // Propagar el error para manejarlo en el código que llama a getConnection()
    }
};

module.exports = {
    getConnection
};
