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

// 새로운 사용자 추가 함수
const addUser = (userId, nickname, email, password, isActive, verificationToken) => {
  const sql = `INSERT INTO users (userId, nickname, email, password, isActive, verificationToken) 
               VALUES (?, ?, ?, ?, ?, ?)`;
  const values = [userId, nickname, email, password, isActive, verificationToken];

  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error('사용자 추가 중 오류 발생:', err);
      return;
    }
    console.log('사용자가 성공적으로 추가되었습니다.');
  });
};

export default connection;
