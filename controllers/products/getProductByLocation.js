const {
  getProductByLocation,
} = require('../../db/queries/produtos/getProductByLocation');

const getProductLocation = async (req, res, next) => {
  try {
    const { letter } = req.params;
    const product = await getProductByLocation(letter);
    res.send({
      status: 'ok',
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getProductLocation;
