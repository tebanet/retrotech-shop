const { generateError } = require('../../helpers/generateError.js');
const { postOrder } = require('../../db/queries/produtos/createOrder.js');
const {
  getSellerIdByProduct,
} = require('../../db/queries/produtos/getSellerIdByProduct.js');

const newOrderController = async (req, res, next) => {
  try {
    const { message, delivery_place } = req.body;

    if (!delivery_place) {
      throw generateError('La direccion es obligatoria', 400);
    }

    const seller = await getSellerIdByProduct(req.params.id);

    const order_id = await postOrder(
      req.userId,
      seller.id_seller,
      req.params.id,
      message,
      delivery_place
    );
    res.send({
      status: 'ok',
      message: `Reserva con id ${order_id} creada con exito`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = newOrderController;
