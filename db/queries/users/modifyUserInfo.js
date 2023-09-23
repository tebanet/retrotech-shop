const getPool = require('../../getDB.js');

const modifyUserInfo = async (id, email, username, password, bio, address) => {
  try {
    const pool = await getPool();

    const [result] = await pool.query(
      `
      UPDATE users SET email = ?, username = ?, password = ?, bio = ?, address = ?
      WHERE id = ?
    `,
      [email, username, password, bio, address, id]
    );

    return result.affectedRows;
  } catch (error) {
    console.error('Error al modificar el usuario:', error);
    throw error;
  }
};

module.exports = modifyUserInfo;
