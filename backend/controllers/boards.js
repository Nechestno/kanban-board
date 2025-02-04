const { prisma } = require('../prisma/prisma-client');

/**
 * @route GET /api/board/getAllUserBoards
 * @desc Получение всех канбан-досок пользователя
 * @access Private
 */
const getAllUserBoards = async (req, res) => {
    const userId = req.user.id;

    try {
        const boards = await prisma.board.findMany({
            where: {
                userId: userId
            }
        });
        if (boards.length === 0) {
            res.status(403).json({message:"Пользоатель не создал не одной канбан-доски."});
        }

        res.status(200).json(boards);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Что-то пошло не так" });
    }
};

/**
 * @route GET /api/board/getBoardById/:boardId
 * @desc Получение конкретной доски с помощью ID
 * @access Private
 */

const getBoardById = async (req, res) => {
    const { boardId } = req.params;
    const id = boardId.split('=')[1];

    try {
        const board = await prisma.board.findUnique({
            where: {
                id,
            }
        });

        if (!board) {
            return res.status(404).json({ message: "Доска не найдена" });
        }

        res.status(200).json(board);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Что-то пошло не так" });
    }
};

/**
 * @route POST /api/board/createBoard
 * @desc Создание канбан-доски
 * @access Private
 */

const createBoard = async (req, res) => {
    const {name} = req.body;
    const userId = req.user.id;

    try{
        if (!name){
            return res.status(400).json({message: 'Пожалуйста, введите название доски'})
        }
        if (!userId){
            return res.status(400).json({message: 'Пользователь не авторизован'})
        }

        const board = await prisma.board.create({
            data: {
                name,
                userId,
            }
        })

        if (board){
            return res.status(201).json(board);
        }
        else{
            return res.status(401).json({message: 'Доска не создана'})
        }

    }
    catch(error){
        console.error(error);
        res.status(500).json({ message: "Что-то пошло не так" });
    }
}

/**
 * @route UPDATE /api/board/updateBoard
 * @desc Обновление канбан-доски
 * @access Private
 */

const updateBoard = async (req, res) => {
    const { id, name } = req.body;
    const userId = req.user.id;

    try {
        if (!id) {
            return res.status(400).json({ message: 'Пожалуйста, укажите ID доски для обновления' });
        }
        if (!name) {
            return res.status(400).json({ message: 'Пожалуйста, введите новое название доски' });
        }
        if (!userId) {
            return res.status(400).json({ message: 'Пользователь не авторизован' });
        }

        const board = await prisma.board.findUnique({
            where: {
                id,
            },
        });

        if (!board || board.userId !== userId) {
            return res.status(404).json({ message: 'Доска не найдена или доступ запрещен' });
        }

        // Update the board
        const updatedBoard = await prisma.board.update({
            where: { id },
            data: { name },
        });

        return res.status(200).json(updatedBoard);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Что-то пошло не так' });
    }
};

/**
 * @route Delete /api/board/deleteBoard/:boardId
 * @desc Удаление канбан-доски
 * @access Private
 */

const deleteBoard = async (req, res) => {
    const { boardId } = req.params;
    const userId = req.user.id;
    const id = boardId.split("=")[1];

    console.log(id);

    try {
        if (!id) {
            return res.status(400).json({ message: 'Пожалуйста, укажите ID доски для удаления' });
        }
        if (!userId) {
            return res.status(400).json({ message: 'Пользователь не авторизован' });
        }

        const board = await prisma.board.findUnique({
            where: {
                id,
            },
        });

        if (!board || board.userId !== userId) {
            return res.status(404).json({ message: 'Доска не найдена или доступ запрещен' });
        }

        await prisma.board.delete({
            where: {
                id,
            },
        });

        return res.status(200).json({ message: 'Доска успешно удалена' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Что-то пошло не так' });
    }
};

module.exports = { getAllUserBoards, getBoardById, createBoard, updateBoard, deleteBoard };