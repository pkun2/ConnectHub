import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import homeRouter from "./router/homeRouter";
import postRouter from "./router/postRouter";
import signUpRouter from "./router/signUpRouter";
import loginRouter from "./router/loginRouter"; 
import verifyEmailRouter from "./router/verifyEmailRouter"; // 이메일 인증 라우터 추가

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", homeRouter);
app.use("/api/post", postRouter);
app.use("/api/signup", signUpRouter); // 회원가입 라우터
app.use("/api/login", loginRouter); // 로그인 라우터
app.use("/api", verifyEmailRouter); // 이메일 인증 라우터 추가

app.listen(PORT, () => {
    console.log(`서버가 해당 주소로 실행중: http://localhost:${PORT}`);
});
