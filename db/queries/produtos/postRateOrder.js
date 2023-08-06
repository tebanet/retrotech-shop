const getPool = require('../../getDB.js');

const postRateOrder = async (
  id_buyer,
  id_seller,
  id_product,
  valoracion,
  commentaries
) => {
  let connection;

  connection = await getPool();

  const [result] = await connection.query(
    `
        INSERT INTO valoraciones (id_buyer, id_seller, id_product, valoracion, comentaries)
        VALUES (?,?,?,?,?)
        `,
    [id_buyer, id_seller, id_product, valoracion, commentaries]
  );

  return result.insertId;
};

module.exports = { postRateOrder };
