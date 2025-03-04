const { prisma } = require('../prisma/prisma-client');

/**
 * @route GET /api/category/getAllCategoriesByBoardId/:boardId
 * @desc Получение всех категорий пользователя
 * @access Private
 */
const getAllCategoriesWithTasksByBoardId = async (req, res) => {
    const userId = req.user.id;
    const { boardId } = req.params;
    console.log(boardId);

    try {
        const categories = await prisma.category.findMany({
            where: {
                boardId: boardId,
                board: {
                    userId: userId,
                },
            },
            include: {
                tasks: true,
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
    const { name, boardId } = req.body;

    try {
        if (!name) {
            return res.status(400).json({ message: "Пожалуйста, введите название категории" });
        }
        if (!boardId) {
            return res.status(400).json({ message: "Пожалуйста, укажите ID доски" });
        }

        const category = await prisma.category.create({
            data: {
                name,
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
 * @route PATCH /api/category/updateCategory
 * @desc Обновление категории
 * @access Private
 */
const updateCategory = async (req, res) => {
    const { id, name } = req.body;

    try {
        if (!id) {
            return res.status(400).json({ message: "Пожалуйста, укажите ID категории для обновления" });
        }

        if (!name) {
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

    try {
        if (!categoryId) {
            return res.status(400).json({ message: "Пожалуйста, укажите ID категории для удаления" });
        }

        const category = await prisma.category.findUnique({
            where: {
                id: categoryId,
            },
        });

        if (!category) {
            return res.status(404).json({ message: "Категория не найдена" });
        }

        await prisma.category.delete({
            where: {
                id: categoryId,
            },
        });

        res.status(200).json({ message: "Категория успешно удалена" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Что-то пошло не так" });
    }
};

module.exports = {
    getAllCategoriesWithTasksByBoardId,
    createCategory,
    updateCategory,
    deleteCategory,
};