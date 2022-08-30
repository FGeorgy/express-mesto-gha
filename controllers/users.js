const User = require('../models/user');
const {
  ErrBadRequest,
  ErrNotFound,
  ErrDefault
} = require('../errors/constants');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send({ data: users }))
    .catch(() => res.status(ErrDefault).send({ message: "Произошла ошибка" }))
};

module.exports.getUser = (req, res) => {
  const { id } = req.params;

  User.findById(id)
    .then((user) => {
      if (!user) {
        res.status(ErrNotFound).send({ message: 'Пользователь не найден' });
      } else {
        res.status(200).send({ data: user })
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ErrBadRequest).send({ message: "Переданы некорректные данные" });
      } else {
        res.status(ErrDefault).send({ message: "Произошла ошибка" })
      }
    })
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar} = req.body;

  User.create({ name, about, avatar})
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      console.log(err);
      if (err.name === 'ValidationError') {
        res.status(ErrBadRequest).send({ message: "Переданы некорректные данные" });
      } else {
        res.status(ErrDefault).send({ message: "Произошла ошибка" })
      }
    })
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;
  const _id = req.user._id;

  User.findByIdAndUpdate(_id, { name, about })
    .then((user) => {
      if (!user) {
        res.status(ErrNotFound).send({ message: 'Пользователь не найден' });
      } else {
        res.status(200).send({ data: user });
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ErrBadRequest).send({ message: "Переданы некорректные данные" });
      } else {
        res.status(ErrDefault).send({ message: "Произошла ошибка" })
      }
    })
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  const _id = req.user._id;

  User.findByIdAndUpdate(_id, { avatar })
  .then((user) => {
    if (!user) {
      res.status(ErrNotFound).send({ message: 'Пользователь не найден' });
    } else {
      res.status(200).send({ data: user });
    }
  })
  .catch((err) => {
    if (err.name === 'ValidationError') {
      res.status(ErrBadRequest).send({ message: "Переданы некорректные данные" });
    } else {
      res.status(ErrDefault).send({ message: "Произошла ошибка" })
    }
  })
};