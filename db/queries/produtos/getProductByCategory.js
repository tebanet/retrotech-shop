const getPool = require('../../getDB.js');
const { generateError } = require('../../../helpers/generateError.js');

const getProductByCategory = async (category) => {
  let connection;

  try {
    connection = await getPool();

    const [result] = await connection.query(
      `
        SELECT * FROM product WHERE category = ?
        `,
      [category]
    );

    if (result.length === 0) {
      throw generateError(`La categoría ${category} no existe`, 404);
    }

    return result;
  } finally {
    if (connection) connection.release;
  }
};

module.exports = { getProductByCategory };
