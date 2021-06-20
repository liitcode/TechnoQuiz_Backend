const router = require('express').Router();
const { categoryData } = require('./category_map');

router.get('/', (req, res) => {
  res.status(200).send(categoryData);
});

module.exports = router;
