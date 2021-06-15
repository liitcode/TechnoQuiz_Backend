const Joi = require('joi');

const quizParam = (data) => {
  const schema = Joi.object({
    category: Joi.number().required(),
    difficulty: Joi.string().max(1).required(),
  });
  return schema.validate(data);
};

module.exports = quizParam;
