const router = require('express').Router();
const User = require('../../models/user');

// Fetch and Sort Top Scorers
router.get('/', async (req, res) => {
  try {
    const result = await User.find({}, { name: 1, score: 1 }).sort({ score: -1 }).limit(10);
    res.status(200).send(result);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
