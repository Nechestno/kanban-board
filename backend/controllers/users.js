const { prisma } = require('../prisma/prisma-client');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
    try {
        const { login, password } = req.body;

        if (!login || !password) {
            return res.status(400).json({ message: 'Пожалуйста, введите логин и пароль' });
        }

        const user = await prisma.user.findFirst({
            where: { login }
        });

        const isPasswordCorrect = user && (await bcrypt.compare(password, user.password));
        const accessSecret = process.env.JWT_SECRET;
        const refreshSecret = process.env.JWT_REFRESH_SECRET;

        if (!accessSecret || !refreshSecret) {
            return res.status(500).json({ message: 'Секретные ключи не настроены' });
        }

        if (isPasswordCorrect && user) {
            const accessToken = jwt.sign({ id: user.id }, accessSecret, { expiresIn: '2d' });

            const refreshToken = jwt.sign({ id: user.id }, refreshSecret, { expiresIn: '7d' });


            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 10 * 24 * 60 * 60 * 1000,
            });

            return res.status(200).json({
                id: user.id,
                login: user.login,
                name: user.name,
                refreshToken: refreshToken,
                accessToken: accessToken,
            });
        } else {
            return res.status(400).json({ message: 'Неверно введен логин или пароль' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Что-то пошло не так' });
    }
};
/**
 * @route POST /api/user/register
 * @desc Регистрация
 * @access Public
 */

const register = async (req, res) => {
    try {
        const { login, password, name } = req.body;

        if (!login || !password || !name) {
            return res.status(400).json({ message: 'Пожалуйста, заполните обязательные поля' });
        }

        const registeredUser = await prisma.user.findFirst({
            where: { login }
        });

        if (registeredUser) {
            return res.status(400).json({ message: 'Пользователь с таким логином уже существует!' });
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

        const accessSecret = process.env.JWT_SECRET;
        const refreshSecret = process.env.JWT_REFRESH_SECRET;

        if (!accessSecret || !refreshSecret) {
            return res.status(500).json({ message: 'Секретные ключи не настроены' });
        }

        if (user) {
            const accessToken = jwt.sign({ id: user.id }, accessSecret, { expiresIn: '2d' });

            const refreshToken = jwt.sign({ id: user.id }, refreshSecret, { expiresIn: '7d' });

            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 10 * 24 * 60 * 60 * 1000, // 7 дней
            });

            return res.status(201).json({
                id: user.id,
                login: user.login,
                name,
                refreshToken: refreshToken,
                accessToken: accessToken,

            });
        } else {
            return res.status(400).json({ message: 'Не удалось создать пользователя' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Что-то пошло не так' });
    }
};
/**
 * @route POST /api/user/refreshAccessToken
 * @desc Обновление токена
 * @access Private
 */

const refreshAccessToken = (req, res) => {
    try {
        const refreshToken = req.body.refreshToken;
        const refreshSecret = process.env.JWT_REFRESH_SECRET;
        const accessSecret = process.env.JWT_SECRET;

        if (!refreshToken) {
            return res.status(401).json({ message: 'Refresh token не найден' });
        }

        jwt.verify(refreshToken, refreshSecret, (err, decoded) => {
            if (err) {
                return res.status(403).json({ message: 'Неверный или просроченный refresh token' });
            }

            const newAccessToken = jwt.sign({ id: decoded.id }, accessSecret, { expiresIn: '2d' });

            return res.status(200).json({ accessToken: newAccessToken });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Что-то пошло не так' });
    }
};

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
    refreshAccessToken,
    current
}