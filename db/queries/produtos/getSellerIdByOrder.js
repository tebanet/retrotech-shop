const getPool = require('../../getDB.js');
const { generateError } = require('../../../helpers/generateError.js');

const getSellerIdByOrder = async (id) => {
  let connection;

  try {
    connection = await getPool();

    const [result] = await connection.query(
      `
        SELECT id_seller FROM orders WHERE order_id= ?
        `,
      [id]
    );

    if (result.length === 0) {
      throw generateError(`El pedido ${id} no existe`, 404);
    }
    return result[0];
  } finally {
    if (connection) connection.release;
  }
};

module.exports = { getSellerIdByOrder };
