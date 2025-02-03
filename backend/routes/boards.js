const express = require('express');
const router = express.Router();
const { auth } = require("../middleware/auth");
const {createBoard, getAllUserBoards, getBoardById} = require("../controllers/boards");


router.get("/getAllUserBoards",auth, getAllUserBoards);

router.get("/:boardId",auth, getBoardById);

router.post("/createBoard",auth, createBoard);


module.exports = router;
