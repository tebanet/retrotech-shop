const getPool = require('../../getDB.js');

const insertNewPassword = async (id, password) => {
  try {
    const pool = await getPool();

    const [result] = await pool.query(
      `
      UPDATE users SET password = ?
      WHERE id = ?
      `,
      [password, id]
    );

    return result.affectedRows;
  } catch (error) {
    console.error('Error al modificar el usuario:', error);
    throw error;
  }
};

module.exports = insertNewPassword;
