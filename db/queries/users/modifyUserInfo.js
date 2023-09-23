const getPool = require('../../getDB.js');

const modifyUserInfo = async (email, username, bio, address, password, id) => {
  try {
    const pool = await getPool();

    const [result] = await pool.query(
      `
      UPDATE users SET email = ?, username = ?, bio = ?, address = ?, password = ?
      WHERE id = ?
    `,
      [email, username, bio, address, password, id]
    );

    return result.affectedRows;
  } catch (error) {
    console.error('Error al modificar el usuario:', error);
    throw error;
  }
};

module.exports = modifyUserInfo;
