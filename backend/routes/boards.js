const express = require('express');
const router = express.Router();
const { auth } = require("../middleware/auth");
const {createBoard, getAllUserBoards, getBoardById, updateBoard, deleteBoard} = require("../controllers/boards");


router.get("/getAllUserBoards",auth, getAllUserBoards);

router.get("/getBoardById/:boardId",auth, getBoardById);

router.post("/createBoard",auth, createBoard);

router.put("/updateBoard",auth, updateBoard);

router.delete("/deleteBoard/:boardId",auth, deleteBoard);


module.exports = router;
