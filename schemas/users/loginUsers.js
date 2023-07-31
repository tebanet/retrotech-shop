const Joi = require('joi');

const loginUserSchema = Joi.object({
  email: Joi.string().email().min(4).max(100).required(),
  password: Joi.string().min(4).max(50).required(),
});

module.exports = loginUserSchema;
