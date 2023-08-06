const createProduct = require('./createProduct');
const getProductByiD = require('./selectUserById.js');
const getAllProducts = require('./selectUserByEmail.js');
const deleteProductByiD = require('./deleteSingleProduct');
const createOrder = require('./createOrder');
const getProductByCategory = require('./getProductByCategory');
const selectSellerByProduct = require('./getSellerByProduct.js');
const getSellerIdByProduct = require('./getSellerIdByProduct');

module.exports = {
  createProduct,
  getProductByiD,
  getAllProducts,
  deleteProductByiD,
  createOrder,
  getProductByCategory,
  selectSellerByProduct,
  getSellerIdByProduct,
};
