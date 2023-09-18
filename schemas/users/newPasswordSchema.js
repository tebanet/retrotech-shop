const Joi = require('joi');

const newPasswordSchema = Joi.object({
  token: Joi.string().required().messages({
    'any.required': 'Es obligatorio colocar la clave de recuperación.',
  }),
  newPassword: Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9]{8,30}$'))
    .required()
    .messages({
      'string.pattern':
        'La contraseña debe tener más de 8 y menos de 30 caracteres, tanto letras mayúsculas o minúsculas como números.',
      'any.required': 'La contraseña es obligatoria.',
    }),
  repeatPassword: Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9]{8,30}$'))
    .required()
    .messages({
      'string.pattern':
        'La contraseña debe tener más de 8 y menos de 30 caracteres, tanto letras mayúsculas o minúsculas como números.',
      'any.required': 'La contraseña es obligatoria.',
    }),
});

module.exports = newPasswordSchema;
