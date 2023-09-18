const getPool = require('../../getDB.js');

const selectUserByRecoveryToken = async (recoveryToken) => {
  const pool = await getPool();

  const [[user]] = await pool.query(
    'SELECT * FROM users WHERE recoveryToken = ?',
    [recoveryToken]
  );

  return user;
};

module.exports = selectUserByRecoveryToken;
