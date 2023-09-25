const jwt = require('jsonwebtoken');
const getOrderInfoByParams = require('../../db/queries/users/getOrderInfoByParams');

const getOrderInfo = async (req, res, next) => {
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

    const orderId = req.params.orderId;

    const orderInfo = await getOrderInfoByParams(userId, orderId);

    res.send({
      status: 'ok',
      orderInfo: orderInfo,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getOrderInfo;
