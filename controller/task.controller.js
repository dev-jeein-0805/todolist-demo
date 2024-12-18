const Task = require('../model/Task');

const taskController = {};

taskController.createTask = async (req, res) => {
    try {
        const { task, isComplete } = req.body; // FE(req) 에서 오는 값=body에 있다
        const newTask = new Task({task, isComplete}); // model 불러오기 -> 위의 req.body 에서 받아온(FE에서 보낸 것) 데이터를 model 에 넣어준다. newTask 생성
        await newTask.save(); // 새로 만든 것을 저장
        res.status(200).json({ status: 'ok', data: newTask }); // 성공 시, res 보내기
    } catch (err) {
        res.status(400).json({ status: 'fail', error: err }); // 실패 시, 보내는 res
    }
};

// async - await 문은 실패할 확률이 높다.
// 인터넷 에러, 네트워크 에러 등등

taskController.getTask = async (req, res) => {
    // TODO : 리스트 전체 읽어와서 주기
    try {
        const taskList = await Task.find({}).select("-__v"); // Task 모델에서, find({})-> 조건 없이 모든 리스트 다 주세요, select("-__v")-> __v 를 빼고 주세요
        res.status(200).json({ status: 'ok', data: taskList });
    } catch (err) {
        res.status(400).json({ status: 'fail', error: err });
    }
};

// 수정 과제
taskController.updateTask = async (req, res) => {
    try {
        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true } //req.body에 스키마 검증을 적용
        );
        if (!updatedTask) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.status(200).json({ status: 'success', data: updatedTask });
    } catch (err) {
        res.status(400).json({ status: "fail", error: err});
    }
};

// 삭제 과제
taskController.deleteTask = async (req, res) => {
    try {
        const deleteItem = await Task.findByIdAndDelete(req.params.id);
        res.status(200).json({ status: "success", data: deleteItem });
    } catch (err) {
        res.status(400).json({ status: "fail", error: err});
    }
};

module.exports = taskController;
