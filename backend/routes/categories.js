const express = require('express');
const router = express.Router();
const { auth } = require("../middleware/auth");
const {createCategory, updateCategory, deleteCategory, getAllCategoriesWithTasksByBoardId} = require("../controllers/categories");


router.get("/getAllCategoriesWithTasksByBoardId/:boardId",auth, getAllCategoriesWithTasksByBoardId);

router.post("/createCategory",auth, createCategory);

router.patch("/updateCategory",auth, updateCategory);

router.delete("/deleteCategory/:categoryId",auth, deleteCategory);


module.exports = router;
