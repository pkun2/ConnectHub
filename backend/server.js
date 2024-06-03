// 서버 메인
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import homeRouter from "./router/homeRouter";
import postRouter from "./router/postRouter";

dotenv.config(); // .env 파일 설정

const app = express();
const PORT = process.env.PORT; // port 설정 .env 참고

app.use(cors());
app.use(express.json()); // Request Body JSON 파싱
app.use(bodyParser.urlencoded({ extended: true })); // Request Body URL 파싱

app.use("/", homeRouter); // 홈 라우터
app.use("/api/post", postRouter) // 게시글 기능 라우터

app.listen(PORT, () => {
    console.log(`서버가 해당 주소로 실행중: http://localhost:${PORT}`);
});
