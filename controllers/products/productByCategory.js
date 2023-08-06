const {
  getProductByCategory,
} = require('../../db/queries/produtos/getProductByCategory');

const productByCategory = async (req, res, next) => {
  const category = req.params.category;

  try {
    const products = await getProductByCategory(category);
    res.send({
      status: 'ok',
      data: products,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = productByCategory;
