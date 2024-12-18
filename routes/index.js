const express = require('express');
const router = express.Router();
const taskApi = require('./task.api');

router.use('/tasks', taskApi); // url 이 /tasks 로 시작하면 감지하고 taskApi 로 보낸다

module.exports = router;
