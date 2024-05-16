import db from '../config/db'; // 데이터베이스 연결 설정 가져오기
import bcrypt from 'bcrypt';   // bcrypt 라이브러리를 사용하여 비밀번호 해싱 및 비교
 
// 로그인 페이지에 대한 GET 요청에 대한 핸들러
export const getLoginController = (req, res) => {
    res.send("로그인 페이지 입니다.");
};

// 로그인에 대한 POST 요청에 대한 핸들러
export const postLoginController = async (req, res) => {
    const { userId, password } = req.body; // 요청에서 userId와 password 추출

    try {
        // 데이터베이스에서 해당 userId를 가진 사용자를 찾음
        const sql = 'SELECT * FROM users3 WHERE userId = ?';
        db.query(sql, [userId], async (err, result) => {
            
            if (err) { // 오류 처리
                console.error('로그인 실패:', err);
                res.status(500).send("로그인 도중 오류가 발생했습니다.");
                return;
            }

            // 사용자가 존재하지 않는 경우
            if (result.length === 0) { 
                res.status(401).send("로그인 실패: 아이디가 존재하지 않습니다.");
                return;
            }
            // 사용자가 존재하는 경우
            const user = result[0]; // 첫 번째 사용자 가져오기
            const isPasswordValid = await bcrypt.compare(password, user.password);

            // 비밀번호가 일치하지 않는 경우
            if (!isPasswordValid) {
                res.status(401).send("로그인 실패: 비밀번호가 일치하지 않습니다.");
                return;
            }

            res.status(200).send("로그인 성공");
        });
    } catch (error) { // 예외 처리
        console.error('로그인 실패:', error);
        res.status(500).send("로그인 도중 오류가 발생했습니다.");
    }
};
