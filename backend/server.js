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

dotenv.config();

const app = express();
const PORT = process.env.PORT; // 포트 번호 설정

app.use(cors()); // CORS 미들웨어 사용
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 라우터 등록
app.use("/", homeRouter);
app.use("/api/post", postRouter);
app.use("/api/signup", signUpRouter);
app.use("/api/login", loginRouter);
app.use("/api", verificationRouter);           // verificationRouter
app.use("/api/password", passwordResetRouter); // 비밀번호 변경 라우터 
app.use("/api/findEmail", emailFindRouter)     // 이메일 찾기 라우터 

// 서버 시작
app.listen(PORT, () => {
    console.log(`서버가 해당 주소로 실행중: http://localhost:${PORT}`);
});
