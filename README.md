# Connect Hub: 시각장애인을 위한 커뮤니티 사이트

# 프로젝트 소개
- 이 프로젝트는 시각장애인이 의견을 나누고 소통할 공간이 충분하지 않다고 느껴 이 프로젝트를 구상하였다.
- 해당 프로젝트는 여타 사이트와 다르게 시각 장애인 친화적인 접근성을 제공하고, 소통의 공간이 존재한다.

## 프로젝트 패키지 설치 방법
1. cd backend
2. npm i
3. cd ..
4. cd frontend
5. npm i

## dotenv 설정 환경 변수: backend 폴더에 .env파일로 생성할 것
```
# mysql
DB_HOST=
DB_USER=
DB_PASSWORD=
DB_DATABASE=

# 전화번호 인증, Twilio
TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=
TWILIO_PHONE_NUMBER=
TWILIO_SERVICE_ID=

# 포트
PORT=4000

# secret key
SESSION_SECRET=
```

## 프로그램 실행 방법
1. cd backend
2. npm start
3. cd ..
4. cd frontend
5. npm start


### 프론트 포트
- 3000
### 백엔드 포트
- 4000
