const Joi = require('joi');

const score_param = (data) => {
    const schema = Joi.object({
        category  : Joi.number().required(),
        difficulty : Joi.string().max(1).required(),
        score : Joi.number().required()
    })
    return schema.validate(data);
}
 
module.exports = score_param;