const getPool = require('../../getDB.js');
const { generateError } = require('../../../helpers/generateError.js');

const getUserOffersById = async (userId) => {
  const pool = await getPool();

  const [result] = await pool.query(
    `SELECT
      orders.order_id,
      product.product_image,
      product.product_title,
      product.price,
      users.username AS buyer,
      orders.order_status,
      orders.order_date,
      orders.message,
      orders.delivery_place
    FROM product
      INNER JOIN orders ON product.product_id = orders.id_product
      INNER JOIN users ON orders.id_buyer = users.id
      WHERE orders.id_seller = (SELECT id FROM users WHERE id = ?)
      ORDER BY orders.order_date DESC;
  `,
    [userId]
  );

  if (result.length === 0) {
    throw generateError(`¡Todavía no tienes pedidos!`, 404);
  }

  return result;
};

module.exports = getUserOffersById;
