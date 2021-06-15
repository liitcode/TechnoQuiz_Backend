const router = require('express').Router();
const category = require('./category_map');

router.get('/', (req, res) => {
  res.status(200).send(category);
});

module.exports = router;
