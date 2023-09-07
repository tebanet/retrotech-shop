const getPool = require('../../getDB.js');
const { generateError } = require('../../../helpers/generateError.js');

const updateOffer = async (
  order_status,
  delivery_date,
  delivery_place,
  delivery_status,
  order_id
) => {
  let connection;

  connection = await getPool();

  const [resultExists] = await connection.query(
    `
    SELECT * FROM orders WHERE orderId = ?
    `,
    [order_id]
  );

  if (resultExists.length === 0) {
    throw generateError(`El pedido ${order_id} no existe`, 404);
  }

  const [resultStatus] = await connection.query(
    `
    SELECT order_status FROM orders WHERE orderId = ?
    `,
    [order_id]
  );
  if (resultStatus[0].order_status === 'rejected') {
    throw generateError(
      `¡No puedes cambiar el estado de un pedido cancelado!`,
      404
    );
  }

  const [result] = await connection.query(
    `
        UPDATE orders SET order_status = ?, delivery_date = ?, delivery_place = ?, delivery_status = ? WHERE order_status IN ('accepted', 'pending') AND orderId = ?;
            `,
    [order_status, delivery_date, delivery_place, delivery_status, order_id]
  );
  return result.order_id;
};

module.exports = updateOffer;
