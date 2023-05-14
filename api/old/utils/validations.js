const Joi = require('@hapi/joi');

exports.signupSchema = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(6),
});
