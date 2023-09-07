const { generateError } = require('../../../helpers/generateError.js');
const getPool = require('../../getDB.js');

const postRateOrder = async (
  id_buyer,
  id_seller,
  id_product,
  valoracion,
  commentaries,
  orderId
) => {
  let connection;

  connection = await getPool();

  const [orderStatus] = await connection.query(
    `
    SELECT order_status FROM orders WHERE orderId = ?
    `,
    [orderId]
  );

  if (orderStatus[0].order_status != 'accepted') {
    throw generateError(`¡No puedes valorar un pedido sin completar!`, 404);
  }

  const [orderIsRated] = await connection.query(
    `
    SELECT * FROM valoraciones WHERE orderId = ?
    `,
    [orderId]
  );

  if (orderIsRated.length === 1) {
    throw generateError(
      `¡No puedes valorar el mismo producto varias veces!`,
      404
    );
  }

  const [result] = await connection.query(
    `
        INSERT INTO valoraciones (id_buyer, id_seller, id_product, valoracion, comentaries, orderId)
        VALUES (?,?,?,?,?,?)
        `,
    [id_buyer, id_seller, id_product, valoracion, commentaries, orderId]
  );

  return result.insertId;
};

module.exports = { postRateOrder };
