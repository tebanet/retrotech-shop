const Joi = require('joi');

const categoryEnum = ['videogame', 'pc', 'accessories', 'photography'];
const placeOfSaleEnum = ['online', 'delivery'];
const locationEnum = [
  'Andalucía',
  'Aragón',
  'Asturias',
  'Balears',
  'Canarias',
  'Cantabria',
  'Castilla y León',
  'Castilla - La Mancha',
  'Catalunya',
  'Comunitat Valenciana',
  'Extremadura',
  'Galicia',
  'Madrid',
  'Murcia',
  'Navarra',
  'País Vasco',
  'Rioja',
  'Ceuta',
  'Melilla',
];

const updateProductSchema = Joi.object({
  product_title: Joi.string().min(4).max(50).optional().allow('').messages({
    'string.min': 'El nombre del producto tiene que tener más de 4 caracteres.',
    'string.max':
      'El nombre del producto tiene que tener menos de 50 caracteres.',
  }),
  category: Joi.string()
    .valid(...categoryEnum)
    .optional()
    .allow(''),
  price: Joi.number().precision(2).allow('').messages({
    'number.base': 'Tienes que expresar el precio en números.',
  }),
  description: Joi.string().allow('').min(15).max(1000).messages({
    'string.min': 'Cuéntanos un poco más acerca de tu producto.',
    'string.max':
      'La descripción del producto tiene que ser un poco más corta.',
  }),
  place_of_sale: Joi.string()
    .valid(...placeOfSaleEnum)
    .allow(''),
  location: Joi.string()
    .valid(...locationEnum)
    .allow(''),
});

module.exports = updateProductSchema;
