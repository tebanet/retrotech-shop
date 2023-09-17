const getPool = require('../../getDB.js');

const saveResetTokenToDatabase = async (id, recoveryToken) => {
  try {
    const pool = await getPool();

    await pool.query('UPDATE users SET recoveryToken = ? WHERE id = ?', [
      recoveryToken,
      id,
    ]);

    return true;
  } catch (error) {
    console.error('Error al guardar el token:', error);
    throw error;
  }
};

module.exports = saveResetTokenToDatabase;
