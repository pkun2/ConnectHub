import Admin from "../model/Admin";


const visitorCounter = async (req, res, next) => {

    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD 형식의 현재 날짜
    try {
        const result = await Admin.getCountVisiter(today); // 오늘 방문자 수 조회
        if (result.length > 0) {
            await Admin.updateCountVisiter(today); // 방문자가 있는 경우 방문자수 1 증가
        } else {
            await Admin.insertCountVisiter(today); // 방문자가 없는 경우 새로운 날짜로 추가
        }
        next(); // 다음 미들웨어로 넘어감
    } catch (err) {
        next(err); // 에러 처리 미들웨어로 넘어에
    }
};

export default visitorCounter;
