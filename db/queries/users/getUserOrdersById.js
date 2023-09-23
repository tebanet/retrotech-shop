const getPool = require('../../getDB.js');
const { generateError } = require('../../../helpers/generateError.js');

const getUserOrdersById = async (userId) => {
  const pool = await getPool();

  const [result] = await pool.query(
    `SELECT
      orders.orderId,
      product.product_image,
      product.product_title,
      product.product_id,
      product.price,
      users.username AS seller,
      orders.order_status,
      orders.order_date
    FROM product
      INNER JOIN orders ON product.product_id = orders.id_product
      INNER JOIN users ON orders.id_seller = users.id
      WHERE orders.id_buyer = (SELECT id FROM users WHERE id = ?)
      ORDER BY orders.order_date DESC;
  `,
    [userId]
  );

  if (result.length === 0) {
    throw generateError('¡Todavía no has pedido nada!', 404);
  }

  return result;
};

module.exports = getUserOrdersById;
