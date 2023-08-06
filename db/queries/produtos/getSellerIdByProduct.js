const getPool = require('../../getDB.js');
const { generateError } = require('../../../helpers/generateError.js');

const getSellerIdByProduct = async (id) => {
  let connection;

  try {
    connection = await getPool();

    const [result] = await connection.query(
      `
        SELECT id_seller FROM product WHERE product_id= ?
        `,
      [id]
    );

    if (result.length === 0) {
      throw generateError(`El producto con el id: ${id} no existe`, 404);
    }
    return result[0];
  } finally {
    if (connection) connection.release;
  }
};

module.exports = { getSellerIdByProduct };
