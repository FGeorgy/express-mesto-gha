const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const token = req.cookies.jwt;

  let payload;

  try {
    payload = jwt.verify(token, 'secret-key');
  } catch (err) {
    res.send({ message: 'Ошибка' });
  }

  req.user = payload;

  next();
};

module.exports = auth;
