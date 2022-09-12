const jwt = require('jsonwebtoken');
const AuthError = require('../errors/AuthError');

const auth = (req, res, next) => {
  const token = req.cookies.jwt;

  let payload;

  try {
    payload = jwt.verify(token, 'secret-key');
  } catch (err) {
    throw new AuthError('Ошибка аутентификации');
  }

  req.user = payload;

  next();
};

module.exports = auth;
