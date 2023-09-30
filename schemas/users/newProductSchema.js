const Joi = require('joi');

const categoryEnum = ['videogame', 'pc', 'accessories', 'photography'];
const statusEnum = ['reserved', 'available', 'sold out'];
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

const newProductSchema = Joi.object({
  product_title: Joi.string().min(4).max(50).required().messages({
    'string.min': 'El nombre del producto tiene que tener más de 4 caracteres.',
    'string.max':
      'El nombre del producto tiene que tener menos de 50 caracteres.',
    'string.empty': 'Este campo no puede estar vacío.',
    'any.required': 'Este campo no puede estar vacío.',
  }),
  category: Joi.string()
    .valid(...categoryEnum)
    .required()
    .messages({
      'any.required': 'Este campo no puede estar vacío.',
      'any.empty': 'Este campo no puede estar vacío.',
    }),
  price: Joi.number().precision(2).required().messages({
    'any.required': 'Es necesario que coloques un precio.',
    'any.empty': 'Este campo no puede estar vacío.',
    'number.base': 'Tienes que expresar el precio en números.',
  }),
  description: Joi.string().required().min(15).max(1000).messages({
    'string.min': 'Cuéntanos un poco más acerca de tu producto.',
    'string.max':
      'La descripción del producto tiene que ser un poco más corta.',
    'any.empty': 'Este campo no puede estar vacío.',
  }),
  status: Joi.string().allow(''),
  place_of_sale: Joi.string()
    .valid(...placeOfSaleEnum)
    .required()
    .messages({ 'any.required': 'Por favor, dinos cómo lo quieres vender.' }),
  location: Joi.string()
    .valid(...locationEnum)
    .required()
    .messages({ 'any.required': 'Por favor, indícanos dónde lo vendes.' }),
});

module.exports = newProductSchema;
