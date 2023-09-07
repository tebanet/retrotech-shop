const updateOrder = require('../../db/queries/produtos/updateOrder.js');
const jwt = require('jsonwebtoken');
const patchOrder = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const decodedToken = jwt.verify(token, process.env.SECRET);
    const userId = decodedToken.id;
    const userUsername = decodedToken.username;

    if (userUsername != req.params.username) {
      res.send({
        error: '400',
        message: '¡No eres el dueño de esta cuenta!',
      });

      return;
    }

    const id_order = req.params.orderId;

    await updateOrder(userId, id_order);

    res.send({
      status: 'ok',
      message: `¡Has cancelado el pedido ${id_order}!`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = patchOrder;
