import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import homeRouter from "./router/homeRouter";
import signUpRouter from "./router/signUpRouter";
import loginRouter from "./router/loginRouter";
import verificationRouter from "./router/verificationRouter";
import passwordResetRouter from "./router/passwordResetRouter";
import emailFindRouter from "./router/emailFindRouter";
import pool from "./config/db.js";
import passwordChangeRouter from './router/passwordChangeRouter';
import nicknameChangeRouter from './router/nicknameChangeRouter';
import cookieParser from "cookie-parser";
import session from "express-session"
import adminRouter from "./router/adminRouter.js";
import visitorCounter from "./middleware/visitorCounter.js"
import postRouter from "./router/postRouter.js"
import userRouter from "./router/userRouter.js";
import notificationRouter from './router/notificationRouter.js';
import authenticateJWT from "./middleware/jwtController.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(cors({
    origin: 'http://localhost:3000', // 리액트 앱의 주소
    credentials: true
})); // CORS 미들웨어 사용
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        secure: false,
        maxAge: 60000
    }

}));
app.use(visitorCounter); // 방문자 수 카운트 미들웨어
app.use("/", homeRouter);
app.use("/api/user", userRouter);          
app.use("/api/post", postRouter);
app.use("/api/signup", signUpRouter);
app.use("/api/login", loginRouter);
app.use("/api", verificationRouter);
app.use("/api/password", passwordResetRouter);
app.use("/api/findEmail", emailFindRouter);
app.use('/api/user/changePassword', passwordChangeRouter);
app.use('/api/user/changeNickname', nicknameChangeRouter);
app.use("/api/admin", adminRouter);
app.use('/api/notifications', notificationRouter);

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
