const createProduct = require('./createProduct');
const getProductByiD = require('./selectUserById.js');
const getProductByName = require('./getProductByName');
const getProductByCategory = require('./getProductByCategory');
const getProductByPrice = require('./getProductByPrice');
const getAllProducts = require('./selectUserByEmail.js');
const deleteProductByiD = require('./deleteSingleProduct');


module.exports = createProduct, getProductByiD, 
                 getAllProducts, deleteProductByiD, 
                 getProductByName, getProductByCategory,
                 getProductByPrice
