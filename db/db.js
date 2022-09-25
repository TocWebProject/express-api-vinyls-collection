const mysql = require('mysql');
require('dotenv').config();

// Utilisation du fichier de configuration .env
let connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER_API,
    password: process.env.PASSWORD,
    port: process.env.PORT,
    database: process.env.DATABASE
});

connection.connect();

module.exports = connection;
