const {prisma} = require('../prisma/prisma-client');

/**
 * @route GET /api/task/getAllTasksByCategoryId/:categoryId
 * @desc Получение всех заданий пользвователя по categoryId
 * @access Private
 */

const getAllTasksByCategoryId = async (req, res) => {
    const { categoryId } = req.params;
    const userId = req.user.id;

    try {
        const tasks = await prisma.task.findMany({
            where: {
                categoryId: categoryId,
                category: {
                    board: {
                        userId: userId,
                    },
                },
            },
            include: {
                category: true, // Include the category details
            },
        });

        if (tasks.length === 0) {
            return res.status(404).json({ message: "Задачи для данной категории не найдены." });
        }

        res.status(200).json(tasks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Что-то пошло не так" });
    }
};

/**
 * @route POST /api/task/createTask
 * @desc Создание задачи
 * @access Private
 */
const createTask = async (req, res) => {
    const { type, title, description, dueDate, tagColor, categoryId } = req.body;

    try {
        if (!type) {
            return res.status(400).json({ message: "Пожалуйста, укажите название работы" });
        }
        if (!title) {
            return res.status(400).json({ message: "Пожалуйста, укажите заголовок задачи" });
        }
        if (!dueDate) {
            return res.status(400).json({ message: "Пожалуйста, укажите срок выполнения задачи" });
        }
        if (!categoryId) {
            return res.status(400).json({ message: "Пожалуйста, укажите ID категории" });
        }


        const task = await prisma.task.create({
            data: {
                type,
                title,
                description,
                dueDate: new Date(dueDate),
                categoryId,
            },
        });

        res.status(201).json(task);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Что-то пошло не так" });
    }
};

/**
 * @route PATCH /api/task/updateTask
 * @desc Обновление задачи
 * @access Private
 */
const updateTask = async (req, res) => {
    const { id, type, title, description, dueDate, categoryId } = req.body;

    try {
        if (!id) {
            return res.status(400).json({ message: "Пожалуйста, укажите ID задачи для обновления" });
        }

        const task = await prisma.task.findUnique({
            where: {
                id,
            },
        });

        if (!task) {
            return res.status(404).json({ message: "Задача не найдена" });
        }

        const updateData = {};
        if (type) updateData.workTitle = type;
        if (title) updateData.title = title;
        if (description) updateData.description = description;
        if (dueDate) updateData.dueDate = new Date(dueDate);
        if (categoryId) updateData.categoryId = categoryId;

        const updatedTask = await prisma.task.update({
            where: { id },
            data: updateData,
        });

        res.status(200).json(updatedTask);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Что-то пошло не так" });
    }
};

/**
 * @route DELETE /api/task/deleteTask/:taskId
 * @desc Удаление задачи
 * @access Private
 */
const deleteTask = async (req, res) => {
    const { taskId } = req.params;
    const id = taskId.split("=")[1];

    try {
        if (!id) {
            return res.status(400).json({ message: "Пожалуйста, укажите ID задачи для удаления" });
        }

        const task = await prisma.task.findUnique({
            where: {
                id,
            },
        });

        if (!task) {
            return res.status(404).json({ message: "Задача не найдена" });
        }

        await prisma.task.delete({
            where: {
                id,
            },
        });

        res.status(200).json({ message: "Задача успешно удалена" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Что-то пошло не так" });
    }
};

module.exports = {
    getAllTasksByCategoryId,
    createTask,
    updateTask,
    deleteTask,
};