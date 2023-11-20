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
