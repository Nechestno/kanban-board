const { prisma } = require('../prisma/prisma-client');

/**
 * @route GET /api/category/getAllCategoriesByBoardId
 * @desc Получение всех категорий пользователя
 * @access Private
 */
const getAllCategoriesByBoardId = async (req, res) => {
    const userId = req.user.id;
    const { boardId } = req.params;
    const id = boardId.split("=")[1];

    try {
        const categories = await prisma.category.findMany({
            where: {
                boardId: id,
                board: {
                    userId: userId,
                },
            },
        });

        if (categories.length === 0) {
            return res.status(404).json({ message: "Категории для данной доски не найдены." });
        }

        res.status(200).json(categories);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Что-то пошло не так" });
    }
};

/**
 * @route POST /api/category/createCategory
 * @desc Создание категории
 * @access Private
 */
const createCategory = async (req, res) => {
    const { name, color, boardId } = req.body;

    try {
        if (!name) {
            return res.status(400).json({ message: "Пожалуйста, введите название категории" });
        }
        if (!color) {
            return res.status(400).json({ message: "Пожалуйста, укажите цвет категории" });
        }
        if (!boardId) {
            return res.status(400).json({ message: "Пожалуйста, укажите ID доски" });
        }

        const category = await prisma.category.create({
            data: {
                name,
                color,
                boardId,
            },
        });

        res.status(201).json(category);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Что-то пошло не так" });
    }
};

/**
 * @route PUT /api/category/updateCategory
 * @desc Обновление категории
 * @access Private
 */
const updateCategory = async (req, res) => {
    const { id, name, color } = req.body;

    try {
        if (!id) {
            return res.status(400).json({ message: "Пожалуйста, укажите ID категории для обновления" });
        }

        if (!name && !color) {
            return res.status(400).json({ message: "Пожалуйста, укажите данные для обновления (имя или цвет)" });
        }

        const category = await prisma.category.findUnique({
            where: {
                id,
            },
        });

        if (!category) {
            return res.status(404).json({ message: "Категория не найдена" });
        }

        const updateData = {};
        if (name) updateData.name = name;
        if (color) updateData.color = color;

        const updatedCategory = await prisma.category.update({
            where: { id },
            data: updateData,
        });

        res.status(200).json(updatedCategory);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Что-то пошло не так" });
    }
};

/**
 * @route DELETE /api/category/deleteCategory/:categoryId
 * @desc Удаление категории
 * @access Private
 */
const deleteCategory = async (req, res) => {
    const { categoryId } = req.params;
    const id = categoryId.split("=")[1];

    try {
        if (!id) {
            return res.status(400).json({ message: "Пожалуйста, укажите ID категории для удаления" });
        }

        const category = await prisma.category.findUnique({
            where: {
                id,
            },
        });

        if (!category) {
            return res.status(404).json({ message: "Категория не найдена" });
        }

        await prisma.category.delete({
            where: {
                id,
            },
        });

        res.status(200).json({ message: "Категория успешно удалена" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Что-то пошло не так" });
    }
};

module.exports = {
    getAllCategoriesByBoardId,
    createCategory,
    updateCategory,
    deleteCategory,
};