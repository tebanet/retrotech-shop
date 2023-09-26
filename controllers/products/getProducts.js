const { getAllProducts } = require('../../db/queries/produtos/getAllProducts');

const getProducts = async (req, res, next) => {
  try {
    const products = await getAllProducts();
    res.send({
      status: 'ok',
      data: products,
    });
  } catch (error) {
    res.send({
      error: '400',
      message: 'No encontrado',
    });
  }
};

module.exports = getProducts;
