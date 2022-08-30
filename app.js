const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { ErrNotFound } = require('./errors/constants');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.user = {
    _id: '6306d1a95aa639c289133f29',
  };

  next();
});

app.use('/', require('./routes/users'));
app.use('/', require('./routes/cards'));

app.all('*', (req, res) => {
  res.status(ErrNotFound).send({ message: 'Запрос не обрабатывается' });
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на ${PORT} порту`);
});
