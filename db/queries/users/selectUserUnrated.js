const getPool = require('../../getDB.js');

const selectUserUnrated = async (userId) => {
  const pool = await getPool();

  const [unrated] = await pool.query(
    `SELECT *, COUNT(*) AS unrated_orders, users.username
    FROM orders
    JOIN product ON product.product_id = orders.id_product
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
