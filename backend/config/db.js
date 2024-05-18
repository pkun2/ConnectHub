import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

// MySQL 데이터베이스 연결 설정
async function connectToDatabase() {
  try {
      const connection = await mysql.createConnection({
          host: process.env.DB_HOST,
          user: process.env.DB_USER,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_DATABASE
      });
      console.log('MySQL에 성공적으로 연결되었습니다.');
      return connection;
  } catch (err) {
      console.error('MySQL 연결 오류:', err);
      throw err;
  }
}

export default connectToDatabase