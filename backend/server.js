import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import homeRouter from "./router/homeRouter";
import postRouter from "./router/postRouter";
import signUpRouter from "./router/signUpRouter";
import loginRouter from "./router/loginRouter";
import verificationRouter from "./router/verificationRouter";
import passwordResetRouter from "./router/passwordResetRouter";
import emailFindRouter from "./router/emailFindRouter";
import pool from "./config/db.js";
import passwordChangeRouter from './router/passwordChangeRouter';
import nicknameChangeRouter from './router/nicknameChangeRouter';

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", homeRouter);
app.use("/api/post", postRouter);
app.use("/api/signup", signUpRouter);
app.use("/api/login", loginRouter);
app.use("/api", verificationRouter);
app.use("/api/password", passwordResetRouter);
app.use("/api/findEmail", emailFindRouter);
app.use('/api/changePassword', passwordChangeRouter);
app.use('/api/changeNickname', nicknameChangeRouter);

const checkConnectDB = async () => {
    try {
        await pool.getConnection();
        console.log("DB 연결 성공");
    } catch (err) {
        console.error("DB 연결 실패");
        console.error(err);
    }
};

checkConnectDB();

app.listen(PORT, () => {
    console.log(`서버가 해당 주소로 실행중: http://localhost:${PORT}`);
});
