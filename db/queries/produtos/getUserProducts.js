const getPool = require('../../getDB.js');

const getAllUserProducts = async (id_seller) => {
  let connection;

  try {
    connection = await getPool();

    const [result] = await connection.query(
      `
        SELECT * FROM product WHERE id_seller= ?
        `,
      [id_seller]
    );

    return result;
  } finally {
    if (connection) connection.release;
  }
};

module.exports = { getAllUserProducts };
