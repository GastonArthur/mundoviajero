const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
dotenv.config();

const pool = mysql.createPool({
    host: 'bmjy4kq6uat1llvnlhr1-mysql.services.clever-cloud.com',
    user: 'ut6c8s0ulpjtmq1p',
    password: 'WfYeRg9v9TjmXtXfjF8J',
    database: 'bmjy4kq6uat1llvnlhr1',
    waitForConnections: true,
    connectionLimit: 5,
    queueLimit: 0
});

module.exports = pool;
