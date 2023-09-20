const {
  getAllUserProducts,
} = require('../../db/queries/produtos/getUserProducts');
const { getIdByUsername } = require('../../db/queries/users/getIdByUsername');
const { getUsernameByURL } = require('../../db/queries/users/getUsernameByURL');

const getUserProducts = async (req, res, next) => {
  try {
    const username = await getUsernameByURL(req.params.username);
    const userId = await getIdByUsername(username);

    console.log(userId);

    const products = await getAllUserProducts(userId);
    res.send({
      status: 'ok',
      data: products,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getUserProducts;
