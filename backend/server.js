// server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import postRouter from "./router/postRouter";
import adminRouter from "./router/adminRouter";
import visitorCounter from "./middleware/visitorCounter";
import pool from "./config/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(visitorCounter);

// 라우터 등록
app.use("/", adminRouter);
app.use("/api/post", postRouter);

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
