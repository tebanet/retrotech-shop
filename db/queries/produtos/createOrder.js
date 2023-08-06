const getPool = require('../../getDB.js');

const postOrder = async (
  id_buyer,
  id_seller,
  id_product,
  message,
  delivery_place
) => {
  let connection;

  connection = await getPool();

  const [result] = await connection.query(
    `
        INSERT INTO orders (id_buyer, id_seller, id_product, message, delivery_place)
        VALUES (?,?,?,?,?)
        `,
    [id_buyer, id_seller, id_product, message, delivery_place]
  );

  return result.insertId;
};

module.exports = { postOrder };
