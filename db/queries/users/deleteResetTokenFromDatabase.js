const getPool = require('../../getDB.js');

const deleteResetTokenFromDatabase = async (id) => {
  try {
    const pool = await getPool();

    await pool.query('UPDATE users SET recoveryToken = NULL WHERE id = ?', [
      id,
    ]);

    return true;
  } catch (error) {
    console.error('Error al eliminar el token:', error);
    throw error;
  }
};

module.exports = deleteResetTokenFromDatabase;
