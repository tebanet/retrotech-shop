const updateOrder = require('../../db/queries/produtos/updateOrder.js');
const {
  getUsernameByURL,
} = require('../../db/queries/users/getUsernameByURL.js');

const patchOrder = async (req, res, next) => {
  try {
    const user = await getUsernameByURL(req.params.username);

    if (user != req.headers.username) {
      res.send({
        error: '400',
        message: '¡No eres el dueño de esta cuenta!',
      });

      return;
    }

    const { order_status } = req.body;

    const id_order = req.params.orderId;

    await updateOrder(user, order_status, id_order);

    res.send({
      status: 'ok',
      message: `¡El pedido ${id_order} ha sido cancelado!`,
      order_status: `${order_status}`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = patchOrder;
