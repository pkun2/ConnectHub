import User from "../model/User";

export const getSignUpController = (req, res) => {
    res.send("회원가입 페이지 입니다.");
}

export const postSignUpController = async (req, res) => {
    const { userId, nickname, email, password } = req.body; // 수정된 부분: username -> userId

    try {
        const newUser = new User({ userId, nickname, email, password }); // 수정된 부분: username -> userId
        await newUser.save();
        res.status(200).send("회원가입 성공");
    } catch (error) {
        console.error('회원가입 실패:', error);
        res.status(500).send("회원가입 도중 오류가 발생했습니다.");
    }
};
