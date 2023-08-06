const { generateError } = require('../../helpers/generateError.js');
const { postRateOrder } = require('../../db/queries/produtos/postRateOrder.js');
const {
  getSellerIdByOrder,
} = require('../../db/queries/produtos/getSellerIdByOrder.js');
const getProductByOrderId = require('../../db/queries/produtos/getProductByOrderId.js');
const getBuyerByOrderID = require('../../db/queries/users/getBuyerByOrderID.js');

const rateOrder = async (req, res, next) => {
  try {
    const { valoracion, comentaries } = req.body;

    if (!valoracion) {
      throw generateError('¡Tienes que valorar al usuario!', 400);
    }

    if (valoracion < 1 || valoracion > 5) {
      throw generateError('La valoracion tiene que ser entre 1 y 5', 400);
    }

    const buyer = await getBuyerByOrderID(req.params.orderID);

    const seller = await getSellerIdByOrder(req.params.orderID);

    const product = await getProductByOrderId(req.params.orderID);

    const order_id = await postRateOrder(
      buyer.id_buyer,
      seller.id_seller,
      product.id_product,
      valoracion,
      comentaries
    );
    res.send({
      status: 'ok',
      message: `¡El pedido ${order_id} ha sido valorado con ${valoracion} estrellas!`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = rateOrder;
