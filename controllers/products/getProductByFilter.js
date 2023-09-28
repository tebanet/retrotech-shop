const getProductFiltered = require('../../db/queries/produtos/getProductFiltered');

const getProductByFilter = async (req, res) => {
  try {
    const products = await getProductFiltered(req.query);

    res.send({
      status: 'ok',
      data: products,
    });
  } catch (error) {
    res.send({
      status: '400',
      error: error,
    });
  }
};

module.exports = getProductByFilter;
