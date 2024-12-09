const mysql = require('mysql2');

const db = mysql.createConnection({
    host: process.env.DB_HOST || '127.127.126.26',       
    user: process.env.DB_USER || 'root',          
    password: process.env.DB_PASSWORD || '',      
    database: process.env.DB_NAME || 'voting_platform' 
});

db.connect((err) => {
    if (err) {
        console.error('Ошибка подключения к базе данных:', err.message);
    } else {
        console.log('Успешное подключение к базе данных');
    }
});

module.exports = db;