const bcrypt = require('bcrypt');
const db = require('../config/db');
const { updateLastOnline } = require('../models/userModel');

const registerUser = async (req, res) => {
    const { firstname, lastname, email, password } = req.body;

    if (!firstname || !lastname || !email || !password) {
        return res.status(400).send('Все поля обязательны');
    }

    try {
        db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
            if (err) {
                return res.status(500).send('Ошибка сервера');
            }

            if (results.length > 0) {
                return res.status(400).send('Пользователь с таким email уже существует');
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            db.query(
                'INSERT INTO users (firstname, lastname, email, password, role) VALUES (?, ?, ?, ?, ?)',
                [firstname, lastname, email, hashedPassword, 'U'],
                (err) => {
                    if (err) {
                        return res.status(500).send('Ошибка сервера');
                    }
                    res.status(201).send('Пользователь успешно зарегистрирован');
                }
            );
        });
    } catch (error) {
        res.status(500).send('Ошибка сервера');
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send('Email и пароль обязательны');
    }

    try {
        db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
            if (err) {
                return res.status(500).send('Ошибка сервера');
            }

            if (results.length === 0) {
                return res.status(400).send('Пользователь не найден');
            }

            const user = results[0];

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).send('Неверный пароль');
            }

            await updateLastOnline(user.id);

            res.status(200).json({ message: 'Авторизация прошла успешно', user });
        });
    } catch (error) {
        res.status(500).send('Ошибка сервера');
    }
};

module.exports = { registerUser, loginUser };
