// 1. 모듈 불러오기
const express = require('express'); // 서버 프레임워크
const mongoose = require('mongoose'); // MongoDB 상호작용 ODM 라이브러리
const cors = require('cors');
const bodyParser = require('body-parser'); // request body 를 JSON 형식으로 파싱하는 미들웨어
const indexRouter = require('./routes/index');

// 2. Express 애플리케이션 생성
const app = express(); // app 인스턴스 생성 
app.use(bodyParser.json()); // 들어오는 요청의 본문을 JSON 형식으로 파싱하여 req.body에 접근할 수 있도록 설정
app.use('/api', indexRouter);
app.use(cors());

// 3. MongoDB 연결 설정
const mongoURI = `mongodb://localhost:27017/todo-demo`; // MongoDB 데이터베이스에 연결하기 위한 URI

// 4. Mongoose 로 MongoDB 연결
mongoose
    .connect(mongoURI, { // mongoose.connect(): 지정된 URI를 사용하여 MongoDB에 연결
        useNewUrlParser: true // 새로운 URL 파서 사용을 설정
    }) 
    .then(() => {
        console.log("mongoose connected");
    })
    .catch((err) => {
        console.log("DB connection failed", err);
    });

// 5. 서버 시작
app.listen(5500, () => { // 5500번 포트에서 서버 시작
    console.log("server on 5500");
});
