const getPool = require('../../getDB.js');

const selectUserByRegistrationCode = async (registrationCode) => {
  const pool = await getPool();

  const [[user]] = await pool.query(
    'SELECT * FROM users WHERE registrationCode = ?',
    [registrationCode]
  );

  return user;
};

module.exports = selectUserByRegistrationCode;
