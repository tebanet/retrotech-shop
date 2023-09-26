const getPool = require('../../getDB.js');

const getOrderInfoByParams = async (userId, orderId) => {
  const pool = await getPool();

  const [result] = await pool.query(
    `
    SELECT product.product_title,
    product.product_image,
    product.price,
    product.category,
    order_status,
    product.location,
    order_date,
    product.description,
    users.username
    FROM orders
    JOIN product ON product.product_id = orders.id_product
    LEFT JOIN users ON users.id = orders.id_seller
    WHERE id_buyer = ?
    AND order_id = ?
  `,
    [userId, orderId]
  );

  return result[0];
};

module.exports = getOrderInfoByParams;
