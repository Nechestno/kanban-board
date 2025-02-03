const { prisma } = require('../prisma/prisma-client');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
    try {
        const {login, password} = req.body;

        if (!login || !password) {
            return res.status(400).json({message: 'Пожалуйста, введите логин и пароль'});
        }

        const user = await prisma.user.findFirst({
            where: {
                login,
            }
        });

        const isPasswordCorrect = user && (await bcrypt.compare(password, user.password));
        const secret = process.env.JWT_SECRET;

        if (isPasswordCorrect && user) {
            res.status(200).json({
                id: user.id,
                login: user.login,
                name: user.name,
                token: jwt.sign({ id: user.id }, secret, { expiresIn: '30d' })
            })
        } else {
            return res.status(400).json({message: 'Неверно введен логин или пароль'})
        }
    }
    catch {
        res.status(500).json({ message: 'Что-то пошло не так' })
    }

}
/**
 * @route POST /api/user/register
 * @desc Регистрация
 * @access Public
 */

const register = async (req, res) => {
    try {
        const {login, password, name} = req.body;

        if (!login || !password || !name) {
            return res.status(400).json({message: 'Пожалуйста, заполните обязательные поля'});
        }

        const registeredUser = await prisma.user.findFirst({
            where: {
                login,
            }
        });

        if (registeredUser) {
            return res.status(400).json({message: 'Пользователь, с таким логином уже существует!'})
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await prisma.user.create({
            data: {
                login,
                name,
                password: hashedPassword,
            }
        });

        const secret = process.env.JWT_SECRET;

        if (user && secret) {
            res.status(201).json({
                id: user.id,
                login: user.login,
                name,
                token: jwt.sign({id: user.id}, secret, {expiresIn: '30d'})
            })
        } else {
            return res.status(400).json({message: 'Не удалось создать пользователя'})
        }
    }
    catch{
        res.status(500).json({ message: 'Что-то пошло не так' })
    }

}

/**
 * @route GET /api/user/current
 * @desc Текущий пользователь
 * @access Private
 */

const current = async (req, res) => {
    return res.status(200).json(req.user);
}

module.exports = {
    login,
    register,
    current
}