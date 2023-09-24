const getPool = require('../../getDB.js');

const selectUserUnrated = async (userId) => {
  const pool = await getPool();

  const [unrated] = await pool.query(
    `SELECT * ,COUNT(*) AS unrated_orders
    FROM orders
    LEFT JOIN valoraciones ON orders.orderId=valoraciones.orderId
    WHERE valoraciones.id_buyer = ?
    GROUP BY valoraciones.id_buyer, valoraciones.id_valoracion;
      `,
    [userId]
  );

  return unrated;
};

module.exports = selectUserUnrated;
