const express = require('express');
const router = express.Router();
const { auth } = require("../middleware/auth");
const {createCategory, updateCategory, deleteCategory, getAllCategoriesByBoardId} = require("../controllers/categories");


router.get("/getAllCategoriesByBoardId",auth, getAllCategoriesByBoardId);

router.post("/createCategory",auth, createCategory);

router.patch("/updateCategory",auth, updateCategory);

router.delete("/deleteCategory/:categoryId",auth, deleteCategory);


module.exports = router;
