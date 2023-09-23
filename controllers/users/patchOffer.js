const updateOffer = require('../../db/queries/produtos/updateOffer.js');
const jwt = require('jsonwebtoken');

const patchOffer = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const decodedToken = jwt.verify(token, process.env.SECRET);
    const userUsername = decodedToken.username;

    if (userUsername != req.params.username) {
      res.send({
        error: '400',
        message: '¡No eres el dueño de esta cuenta!',
      });

      return;
    }

    const { order_status, delivery_date, delivery_place, delivery_status } =
      req.body;

    /* if (order_status == 'accepted') {
      try {
        if (!delivery_date) {
          res.send({
            error: '400',
            message: '¡Tienes que indicar cuando has mandado el pedido!',
          });
        }

        if (!delivery_place) {
          res.send({
            error: '400',
            message: '¡Tienes que indicar donde va el pedido!',
          });
        }

        if (!delivery_status) {
          res.send({
            error: '400',
            message: '¡Tienes que indicar el estado del pedido!',
          });
        }
      } catch (error) {
        next(error);
      }
    } */

    const id_order = req.params.orderId;

    await updateOffer(
      order_status,
      delivery_date,
      delivery_place,
      delivery_status,
      id_order
    );

    res.send({
      status: 'ok',
      message: `¡El pedido ${id_order} ha sido actualizado!`,
      order_status: `${order_status}`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = patchOffer;
