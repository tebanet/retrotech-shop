const getSingleProduct = require('./getSingleProduct.js');
const getProducts = require('./getProducts.js');
const newProduct = require('./newProduct.js');
const deleteProduct = require('./deleteProduct.js');
const postOrder = require('./postOrder.js');
const productByCategory = require('./productByCategory.js'); // Toni
const getProductByCategory = require('./getProductByCategory.js'); // Bruno
const getSellerId = require('./getSellerId.js');
const getProductByName = require('./getProductByName.js');
const getProductByPrice = require('./getProductByPrice.js');

module.exports = {
  getSingleProduct,
  getProducts,
  newProduct,
  deleteProduct,
  postOrder,
  productByCategory,
  getSellerId,
  getProductByName, 
  getProductByCategory, 
  getProductByPrice
};