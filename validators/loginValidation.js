const Joi = require('joi');

const loginValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string().email().min(6).max(50).required(),
        password: Joi.string().min(6).max(1024).required(),
    });
    return schema.validate(data);
};

module.exports = loginValidation;