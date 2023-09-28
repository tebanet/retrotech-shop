const getPool = require('../../getDB.js');
const { generateError } = require('../../../helpers/generateError.js');

const updateOrder = async (userId, order_id) => {
  let connection;
  connection = await getPool();

  const [resultExists] = await connection.query(
    `
    SELECT * FROM orders WHERE order_id = ?
    `,
    [order_id]
  );

  const [orderCancelled] = await connection.query(
    `
    SELECT order_status FROM orders WHERE order_id = ?
    `,
    [order_id]
  );

  if (orderCancelled[0].order_status === 'rejected') {
    throw generateError(`¡No puedes volver a cancelar este pedido!`, 404);
  }

  if (resultExists.length === 0) {
    throw generateError(`El pedido ${order_id} no existe`, 404);
  }

  const [checkUserOwnership] = await connection.query(
    `
    SELECT users.id FROM orders INNER JOIN users ON users.id = orders.id_buyer WHERE orders.order_id = ?
    `,
    [order_id]
  );

  if (checkUserOwnership[0].id != userId) {
    throw generateError(`¡Este pedido no es tuyo!`, 404);
  }

  const [result] = await connection.query(
    `
        UPDATE orders SET order_status = 'rejected' WHERE order_status = 'pending' AND order_id = ?;
            `,
    [order_id]
  );

  return result.order_id;
};

module.exports = updateOrder;
