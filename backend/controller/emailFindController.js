import db from '../config/db.js';

export const findEmailByPhoneNum = async (req, res) => {
    const { phoneNum } = req.body;

    try {
        const sql = 'SELECT email FROM users WHERE phoneNum = ?';
        const [rows] = await db.query(sql, [phoneNum]);
        
        if (rows.length === 0) {
            return res.status(404).send('일치하는 사용자가 없습니다.');
        }

        const emails = rows.map(row => row.email); // 모든 이메일을 배열로 변환
        const formattedEmails = emails.join(', '); // 쉼표로 구분된 문자열로 변환
        res.status(200).send(formattedEmails);
    } catch (error) {
        console.error('이메일 찾기 실패:', error);
        res.status(500).send('서버 오류가 발생했습니다.');
    }
};
