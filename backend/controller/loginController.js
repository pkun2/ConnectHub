import User from "../model/User";

export const getLoginController = (req, res) => {
    res.send("로그인 페이지 입니다.");
}

export const postLoginController = async (req, res) => {
    const { userId, password } = req.body;
    console.log(req.body)

    try {
        // 사용자 검색
        const user = await User.findOne({ userId });
        if (!user) {
            res.status(401).send("로그인 실패: 아이디가 존재하지 않습니다.");
            return;
        }
        // 비밀번호 검증
        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            res.status(401).send("로그인 실패: 비밀번호가 일치하지 않습니다.");
            return;
        }
        res.status(200).send("로그인 성공");
    } catch (error) {
        console.error('로그인 실패:', error);
        res.status(500).send("로그인 도중 오류가 발생했습니다.");
    }
};