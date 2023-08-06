const {
  getProductByCategoryLike,
} = require('../../db/queries/produtos/getProductByCategory');

const getProductCategoryLike = async (req, res, next) => {
  try {
    const { letter } = req.params;
    const product = await getProductByCategoryLike(letter);
    res.send({
      status: 'ok',
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getProductCategoryLike;
