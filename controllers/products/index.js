const getSingleProduct = require('./getSingleProduct.js');
const getProducts = require('./getProducts.js');
const newProduct = require('./newProduct.js');
const deleteProduct = require('./deleteProduct.js');
const postOrder = require('./postOrder.js');
const productByCategory = require('./productByCategory.js');
const getSellerId = require('./getSellerId.js');

module.exports = {
  getSingleProduct,
  getProducts,
  newProduct,
  deleteProduct,
  postOrder,
  productByCategory,
  getSellerId,
};
