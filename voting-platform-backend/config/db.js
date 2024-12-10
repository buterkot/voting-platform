const mysql = require('mysql2');

const db = mysql.createPool({
    host: process.env.DB_HOST || '127.127.126.26',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'voting_platform',
    connectionLimit: 10,  
});

db.getConnection((err, connection) => {
    if (err) {
        console.error('Ошибка подключения к базе данных:', err.message);
    } else {
        console.log('Успешное подключение к базе данных');
        connection.release(); 
    }
});

module.exports = db;
