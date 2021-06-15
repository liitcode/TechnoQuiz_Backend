const jwt = require('jsonwebtoken');

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const token = req.header('Auth-Token');
  if (!token) return res.status(401).send('Access Denied');
  try {
    const verified = jwt.verify(token, process.env.AUTH_TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send('Invalid Token');
  }
};
