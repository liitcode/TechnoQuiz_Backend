/* eslint-disable consistent-return */
const router = require('express').Router();
const category = require('../categories/category_map');
const verifyUser = require('../auth/verifyToken');
const difficulty = require('../quiz/difficulty_map');
const validateScore = require('./validation');
const User = require('../../models/user');

router.post('/', verifyUser, async (req, res) => {
  const { error } = validateScore(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const sessionData = {
    attemptDate: new Date().toJSON().replace(/-/g, '/'),
    category: category[req.body.category],
    difficulty: difficulty[req.body.difficulty],
    scored: req.body.score,
  };
  const userId = req.user.id;
  try {
    await User.findByIdAndUpdate(userId, {
      $inc: { score: req.body.score },
      $push: { quizLog: sessionData },
    }, { upsert: true });
    res.status(200).send('Score Updated');
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
