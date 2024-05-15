import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

// MySQL 데이터베이스 연결 설정
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});

// 데이터베이스 연결
connection.connect((err) => {
  if (err) {
    console.error('데이터베이스 연결중 오류발생:', err);
    return;
  }
  console.log(`데이터베이스: ${process.env.DB_DATABASE}가 연결되었습니다`);
});

export default connection;