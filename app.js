const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 63342;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'Limb')));

// Массив для хранения пользователей (вместо базы данных)
const users = [];

// Обработка GET-запроса к корневому URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'Limb', 'index.html'));
});

// Регистрация пользователя
app.post('/api/register', (req, res) => {
    const { username, password } = req.body;

    // Проверка на уникальность имени пользователя
    const existingUser = users.find(user => user.username === username);
    if (existingUser) {
        return res.status(400).json({ error: 'Имя пользователя уже занято.' });
    }

    // Добавление нового пользователя
    users.push({ username, password });
    res.status(201).json({ message: 'Пользователь успешно зарегистрирован.' });
});

// Вход пользователя
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    const user = users.find(user => user.username === username && user.password === password);
    if (!user) {
        return res.status(401).json({ error: 'Неверное имя пользователя или пароль.' });
    }

    res.status(200).json({ message: 'Успешный вход.', isLoggedIn: true });

});

// Валидация логина
app.post('/api/validateLogin', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(user => user.username === username && user.password === password);
    res.json({ valid: !!user });
});

// Валидация регистрации
app.post('/api/validateRegistration', (req, res) => {
    const { password, passwordConfirm } = req.body;
    const isValid = password === passwordConfirm;
    res.json({ valid: isValid });
});

app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});
