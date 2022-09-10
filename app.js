const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');

const NotFoundError = require('./errors/NotFoundError');
const {
  createUser,
  login,
} = require('./controllers/users');
const auth = require('./middlewares/auth');
const { loginValidation, userValidation } = require('./middlewares/validators');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/signin', loginValidation, login);
app.post('/signup', userValidation, createUser);

app.use('/', auth, require('./routes/users'));
app.use('/', auth, require('./routes/cards'));

app.all('*', () => {
  throw new NotFoundError('Запрос не обрабатывается');
});

app.use(
  errors(),
  (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = statusCode === 500 ? 'Ошибка сервера' : err.message;
    res.status(statusCode).send({ message });
    next();
  },
);

app.listen(PORT, () => {
  console.log(`Сервер запущен на ${PORT} порту`);
});
