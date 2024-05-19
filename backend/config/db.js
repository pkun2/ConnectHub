import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

// promise 모듈을 사용했기 때문에 try-catch 생략 
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

export default pool;
