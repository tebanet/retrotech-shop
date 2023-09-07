const getUserOrdersById = require('../../db/queries/users/getUserOrdersById');
const jwt = require('jsonwebtoken');

const getUserOrders = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const decodedToken = jwt.verify(token, process.env.SECRET);
    const userId = decodedToken.id;
    const userUsername = decodedToken.username;

    if (userUsername != req.params.username) {
      res.send({
        error: '400',
        message: '¡No puedes ver pedidos de otras personas!',
      });

      return;
    }

    const orders = await getUserOrdersById(userId);

    res.send({
      status: 'ok',
      orders: orders,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getUserOrders;
