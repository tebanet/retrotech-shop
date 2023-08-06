const getPool = require('../../getDB.js');
const { generateError } = require('../../../helpers/generateError.js');

const getProductByOrderId = async (id) => {
  let connection;

  try {
    connection = await getPool();

    const [result] = await connection.query(
      `
        SELECT id_product FROM orders WHERE orderId= ?
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

module.exports = getProductByOrderId;
