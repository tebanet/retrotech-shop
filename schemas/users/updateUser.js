const Joi = require('joi');

const updateUserSchema = Joi.object({
  email: Joi.string().email().min(4).max(100),
  username: Joi.string().min(4).max(100),
  password: Joi.string().min(4).max(50),
  bio: Joi.string().min(4).max(255),
});

module.exports = updateUserSchema;
