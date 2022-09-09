const router = require('express').Router();
const {
  getUsers,
  getUser,
  updateUser,
  updateAvatar,
  getCurrentUser,
} = require('../controllers/users');
const {
  idValidation,
  userAboutValidation,
  avatarValidation,
} = require('../middlewares/validators');

router.get('/users', getUsers);
router.get('/users/:userId', idValidation, getUser);
router.patch('/users/me', userAboutValidation, updateUser);
router.patch('/users/me/avatar', avatarValidation, updateAvatar);
router.patch('/users/me', idValidation, getCurrentUser);

module.exports = router;
