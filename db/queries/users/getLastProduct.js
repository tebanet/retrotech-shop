const { generateError } = require('../../../helpers/generateError.js');
const getPool = require('../../getDB.js');

const getLastProduct = async (id_seller) => {
  let connection;
  try {
    connection = await getPool();

    const [result] = await connection.query(
      `SELECT * FROM product WHERE id_seller = ? ORDER BY createdAt DESC LIMIT 1  `,
      [id_seller]
    );
    if (result.length === 0) {
      throw generateError(`El usuario ${id_seller} no tiene productos`, 404);
    }
    return result[0];
  } catch (error) {
    console.error('Error:', error);
  }
};

module.exports = getLastProduct;
