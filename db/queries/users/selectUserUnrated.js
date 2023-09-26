const getPool = require('../../getDB.js');

const selectUserUnrated = async (userId) => {
  const pool = await getPool();

  const [unrated] = await pool.query(
    `SELECT product.product_id,
    product.product_title,
    product.product_image,
    product.price,
    users.username,
    orders.order_id,
    orders.order_status,
    COUNT(*) AS unrated_orders
    FROM orders
    LEFT JOIN product ON product.product_id = orders.id_product
    LEFT JOIN users ON product.id_seller = users.id
    WHERE order_id NOT IN (
      SELECT order_id
      FROM valoraciones)
    AND id_buyer = ?
    AND order_status = 'accepted'
    GROUP BY order_id
      `,
    [userId]
  );

  return unrated;
};

module.exports = selectUserUnrated;
