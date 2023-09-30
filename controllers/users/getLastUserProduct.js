const getLastProduct = require('../../db/queries/users/getLastProduct');

const getLastUserProduct = async (req, res, next) => {
  try {
    const id_seller = req.params.id_seller;
    const product = await getLastProduct(id_seller);
    res.send({
      status: 'ok',
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getLastUserProduct;
