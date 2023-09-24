const Joi = require('joi');

const updateUserSchema = Joi.object({
  id: Joi.string(),
  address: Joi.string().allow('').min(4).max(100).messages({
    'string.min': 'La biografía debe tener más de 4 caracteres.',
    'string.max': 'La biografía debe tener menos de 100 caracteres.',
  }),
  bio: Joi.string().allow('').min(4).max(255).messages({
    'string.min': 'La biografía debe tener más de 4 caracteres.',
    'string.max': 'La biografía debe tener menos de 255 caracteres.',
  }),
  email: Joi.string().email().allow('').min(4).max(100).messages({
    'string.min': 'El correo electrónico debe tener más de 4 caracteres.',
    'string.max': 'El correo electrónico debe tener menos de 100 caracteres.',
  }),
  password: Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9]{8,30}$'))
    .required()
    .messages({
      'string.pattern':
        'La contraseña debe tener más de 8 y menos de 30 caracteres, tanto letras mayúsculas o minúsculas como números.',
      'any.required':
        'Por motivos de seguridad, es obligatorio que coloques tu contraseña.',
    }),
  username: Joi.string().allow('').min(4).max(100).messages({
    'string.min': 'El nombre de usuario debe tener más de 4 caracteres.',
    'string.max': 'El nombre de usuario debe tener menos de 100 caracteres.',
  }),
});

module.exports = updateUserSchema;
