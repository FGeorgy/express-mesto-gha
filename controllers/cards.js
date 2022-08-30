const Card = require('../models/card');
const {
  ErrBadRequest,
  ErrNotFound,
  ErrDefault,
} = require('../errors/constants');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(() => res.status(ErrDefault).send({ message: 'Произошла ошибка' }));
};

module.exports.createCard = (req, res) => {
  const userId = req.user._id;
  const { name, link } = req.body;

  Card.create({ name, link, owner: userId })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ErrBadRequest).send({ message: 'Переданы некорректные данные' });
      } else {
        res.status(ErrDefault).send({ message: 'Произошла ошибка' });
      }
    });
};

module.exports.deleteCard = (req, res) => {
  const { cardId } = req.params;

  Card.findById(cardId)
    .then((card) => {
      if (!card) {
        res.status(ErrNotFound).send({ message: 'Карточка не найдена' });
      } else {
        Card.deleteOne({ cardId })
          .then(() => res.send({ message: 'Карточка удалена' }));
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ErrBadRequest).send({ message: 'Переданы некорректные данные' });
      } else {
        res.status(ErrDefault).send({ message: 'Произошла ошибка' });
      }
    });
};

module.exports.likeCard = (req, res) => {
  const userId = req.user._id;
  const { cardId } = req.params;

  Card.findByIdAndUpdate(cardId, { $addToSet: { likes: userId } }, { new: true })
    .then((card) => {
      if (!card) {
        res.status(ErrNotFound).send({ message: 'Карточка не найдена' });
      } else {
        res.send({ data: card });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ErrBadRequest).send({ message: 'Переданы некорректные данные' });
      } else {
        res.status(ErrDefault).send({ message: 'Произошла ошибка' });
      }
    });
};

module.exports.dislikeCard = (req, res) => {
  const userId = req.user._id;
  const { cardId } = req.params;

  Card.findByIdAndUpdate(cardId, { $pull: { likes: userId } }, { new: true })
    .then((card) => {
      if (!card) {
        res.status(ErrNotFound).send({ message: 'Карточка не найдена' });
      } else {
        res.send({ data: card });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ErrBadRequest).send({ message: 'Переданы некорректные данные' });
      } else {
        res.status(ErrDefault).send({ message: 'Произошла ошибка' });
      }
    });
};
