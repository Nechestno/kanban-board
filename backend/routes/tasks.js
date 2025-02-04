const express = require('express');
const router = express.Router();
const { auth } = require("../middleware/auth");
const {getAllTasksByCategoryId, createTask, updateTask, deleteTask} = require("../controllers/tasks");


router.get("/getAllTasksByCategoryId",auth, getAllTasksByCategoryId);

router.post("/createTask",auth, createTask);

router.patch("/updateTask",auth, updateTask);

router.delete("/deleteTask/:taskId",auth, deleteTask);


module.exports = router;