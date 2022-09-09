const router = require('express').Router();
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');
const {
  idValidation,
  cardValidation,
} = require('../middlewares/validators');

router.get('/cards', getCards);
router.post('/cards', cardValidation, createCard);
router.delete('/cards/:cardId', idValidation, deleteCard);
router.put('/cards/:cardId/likes', idValidation, likeCard);
router.delete('/cards/:cardId/likes', idValidation, dislikeCard);

module.exports = router;
