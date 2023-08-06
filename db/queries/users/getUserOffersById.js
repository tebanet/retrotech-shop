const getPool = require('../../getDB.js');
const { generateError } = require('../../../helpers/generateError.js');

const getUserOffersById = async (username) => {
  const pool = await getPool();

  const [result] = await pool.query(
    `SELECT
      orders.orderId,
      product.product_image,
      product.product_title,
      product.price,
      users.username AS buyer,
      orders.order_status,
      orders.order_date
    FROM product
      INNER JOIN orders ON product.product_id = orders.id_product
      INNER JOIN users ON orders.id_buyer = users.id
      WHERE orders.id_seller = (SELECT id FROM users WHERE username = ?)
      ORDER BY orders.order_date DESC;
  `,
    [username]
  );

  if (result.length === 0) {
    throw generateError(`${username}, ¡todavía no tienes pedidos!`, 404);
  }

  return result;
};

module.exports = getUserOffersById;
