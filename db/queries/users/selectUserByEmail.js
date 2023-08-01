const getPool = require('../../getDB.js');

const selectUserByEmail = async (email) => {
  const pool = await getPool();

  const [[user]] = await pool.query('SELECT * FROM users WHERE email = ?', [
    email,
  ]);

  return user;
};

module.exports = selectUserByEmail;
