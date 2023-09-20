const getPool = require('../../getDB.js');
const { generateError } = require('../../../helpers/generateError.js');

const getIdByUsername = async (username) => {
  let connection;

  try {
    connection = await getPool();

    const [result] = await connection.query(
      `
        SELECT id FROM users WHERE username= ?
        `,
      [username]
    );

    if (result.length === 0) {
      throw generateError(`El usuario ${username} no existe`, 404);
    }
    return result[0].id;
  } finally {
    if (connection) connection.release;
  }
};

module.exports = { getIdByUsername };
