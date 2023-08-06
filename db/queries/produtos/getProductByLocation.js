const getPool = require('../../getDB.js');
const { generateError } = require('../../../helpers/generateError.js');

const getProductByLocation = async (letter) => {
  let connection;

  try {
    connection = await getPool();

    const [result] = await connection.query(
      `
        SELECT * FROM product WHERE location LIKE '${letter}%'
        `,
      [letter]
    );

    if (result.length === 0) {
      throw generateError(`Este producto no existe`, 404);
    }
    return result;
  } finally {
    if (connection) connection.release;
  }
};

module.exports = { getProductByLocation };
