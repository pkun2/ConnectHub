import bcrypt from 'bcrypt';
import db from '../config/db.js';

export const changePasswordController = async (req, res) => {
    const { email, currentPassword, newPassword } = req.body;

    if (!email || !currentPassword || !newPassword) {
        return res.status(400).send('필수 필드가 누락되었습니다.');
    }

    try {
        const sql = 'SELECT * FROM users WHERE email = ?';
        const [result] = await db.query(sql, [email]);

        if (result.length === 0) {
            return res.status(404).send('해당 이메일을 찾을 수 없습니다.');
        }

        const user = result[0];
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(401).send('현재 비밀번호가 일치하지 않습니다.');
        }

        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        const updateSql = 'UPDATE users SET password = ? WHERE email = ?';
        await db.query(updateSql, [hashedNewPassword, email]);

        res.status(200).send('비밀번호가 성공적으로 변경되었습니다.');
    } catch (error) {
        console.error('비밀번호 변경 중 오류 발생:', error);
        res.status(500).send('서버 오류가 발생했습니다.');
    }
};
