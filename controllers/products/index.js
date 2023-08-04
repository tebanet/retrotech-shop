const getSingleProduct = require('./getSingleProduct.js');
const getProducts = require('./getProducts.js');
const newProduct = require('./newProduct.js');
const deleteProduct = require('./deleteProduct.js');
const getProductByName = require('./getProductByName.js');
const getProductByCategory = require('./getProductByCategory.js');
const getProductByPrice = require('./getProductByPrice.js');


module.exports = { getSingleProduct, getProducts, newProduct, deleteProduct, 
                   getProductByName, getProductByCategory, getProductByPrice };