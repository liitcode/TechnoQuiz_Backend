const Joi = require('joi');

const scoreParam = (data) => {
  const schema = Joi.object({
    category: Joi.number().required(),
    difficulty: Joi.string().max(1).required(),
    score: Joi.number().required(),
  });
  return schema.validate(data);
};

module.exports = scoreParam;
