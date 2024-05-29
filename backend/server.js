// server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import homeRouter from "./router/homeRouter";
import postRouter from "./router/postRouter";
import signUpRouter from "./router/signUpRouter";
import loginRouter from "./router/loginRouter";
import verificationRouter from "./router/verificationRouter"; // 수정: 오타 수정
import passwordResetRouter from "./router/passwordResetRouter"; // passwordResetRouter 추가
import emailFindRouter from "./router/emailFindRouter";
import pool from "./config/db.js";
import adminRouter from "./router/adminRouter.js";
import visitorCounter from "./middleware/visitorCounter.js"

dotenv.config();

const app = express();
const PORT = process.env.PORT; // 포트 번호 설정

app.use(cors()); // CORS 미들웨어 사용
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(visitorCounter); // 방문자 수 카운트 미들웨어

// 라우터 등록
app.use("/", homeRouter);
app.use("/api/post", postRouter);
app.use("/api/signup", signUpRouter);
app.use("/api/login", loginRouter);
app.use("/api", verificationRouter);           // verificationRouter
app.use("/api/password", passwordResetRouter); // 비밀번호 변경 라우터 
app.use("/api/findEmail", emailFindRouter);     // 이메일 찾기 라우터 
app.use("/api/admin", adminRouter);

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
