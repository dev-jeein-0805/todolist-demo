const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = Schema({
    task: {
        type: String,
        required: true,
    },
    isComplete: {
        type: Boolean,
        required: true,
    },
},
{ timestamps: true } // 생성되는 날짜를 도장 꽝 찍어주는 옵션
)

// model 에 데이터가 들어가는 것
// schema 는 작업 지시서(이렇게 생겼을 것이다 구상)이고, 
// schema(작업지시서)를 가지고 실제 데이터가 들어가는 model 을 만들어야 한다.

const Task = mongoose.model("Task", taskSchema); // Task 라는 모델을 만들거고, 이 모델은 taskSchema 를 참고해서 만들 거다.

module.exports = Task;
