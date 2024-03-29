const Joi = require('joi');

const registerValidation = (data) => {
    const schema = Joi.object({
        username: Joi.string().alphanum().min(3).max(20).required(),
        email: Joi.string().email().min(6).max(50).required(),
        password: Joi.string().min(6).max(1024).required(),
        fullname: Joi.string().required(),
    });
    return schema.validate(data);
};

module.exports = registerValidation;