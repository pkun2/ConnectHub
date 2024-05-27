import db from '../config/db.js';
import bcrypt from 'bcrypt';

export const getLoginController = (req, res) => {
    res.send("로그인 페이지입니다.");
};

export const postLoginController = async (req, res) => {
    const { email, password } = req.body;

    try {
        const sql = 'SELECT * FROM users WHERE email = ?';
        const [result] = await db.query(sql, [email]);

        if (result.length === 0) {
            res.status(401).send("로그인 실패: 이메일이 존재하지 않습니다.");
            return;
        }

        const user = result[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(401).send("로그인 실패: 비밀번호가 일치하지 않습니다.");
            return;
        }

        res.status(200).send("로그인 성공");
    } catch (error) {
        console.error('로그인 도중 오류가 발생했습니다:', error);
        res.status(500).send("로그인 도중 오류가 발생했습니다.");
    }
};
