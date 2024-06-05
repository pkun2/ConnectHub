import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import pool from "./config/db.js";

import postRouter from "./router/postRouter.js"
import userRouter from "./router/userRouter.js";
import notificationRouter from './router/notificationRouter.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT; // 포트 번호 설정

app.use(cors()); // CORS 미들웨어 사용
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 라우터 등록
app.use("/api/post", postRouter);
app.use("/api/user", userRouter);          
app.use('/api/notifications', notificationRouter);


const checkConnectDB = async () => {
    try {
        // DB 연결 확인
        await pool.getConnection();
        console.log("DB 연결 성공");
    } catch (err) {
        console.error("DB 연결 실패");
        console.error(err);
    }
};

checkConnectDB();

// 서버 시작
app.listen(PORT, () => {
    console.log(`서버가 해당 주소로 실행중: http://localhost:${PORT}`);
});
