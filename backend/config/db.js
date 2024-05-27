import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

// MySQL 데이터베이스 연결 설정

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0 
});

export default pool