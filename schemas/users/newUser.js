const Joi = require('joi');

const newUserSchema = Joi.object({
  email: Joi.string().email().min(4).max(100).required(),
  username: Joi.string().min(4).max(100).required(),
  password: Joi.string().min(4).max(50).required(),
});

module.exports = newUserSchema;
