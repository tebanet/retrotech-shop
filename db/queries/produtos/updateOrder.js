const getPool = require('../../getDB.js');
const { generateError } = require('../../../helpers/generateError.js');

const updateOrder = async (user, order_status, order_id) => {
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

  const [checkUserOwnership] = await connection.query(
    `
    SELECT users.username FROM orders INNER JOIN users ON users.id = orders.id_buyer WHERE orders.orderId = ?
    `,
    [order_id]
  );

  if (checkUserOwnership[0].username != user) {
    throw generateError(`¡Este pedido no es tuyo!`, 404);
  }

  const [result] = await connection.query(
    `
        UPDATE orders SET order_status = ? WHERE order_status = 'pending' AND orderId = ?;
            `,
    [order_status, order_id]
  );

  return result.order_id;
};

module.exports = updateOrder;
