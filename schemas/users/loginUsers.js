const Joi = require('joi');

const loginUserSchema = Joi.object({
  email: Joi.string().email().min(4).max(100).required().messages({
    'string.min': 'El correo electrónico debe tener más de 4 caracteres.',
    'string.max': 'El correo electrónico debe tener menos de 100 caracteres.',
  }),
  password: Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9]{8,30}$'))
    .required()
    .messages({
      'string.pattern':
        'La contraseña debe tener más de 8 y menos de 30 caracteres, tanto letras mayúsculas o minúsculas como números.',
      'any.required': 'La contraseña es obligatoria.',
    }),
});

module.exports = loginUserSchema;
