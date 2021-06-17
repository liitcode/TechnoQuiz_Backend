/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.header('Auth-Token');
  if (!token) return res.status(401).send({ message: 'Access Denied' });
  try {
    const verified = jwt.verify(token, process.env.AUTH_TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send({ message: 'Invalid Token' });
  }
};
