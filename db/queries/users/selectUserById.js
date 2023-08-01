const getPool = require('../../getDB.js');

const selectUserById = async (id) => {
  const pool = await getPool();

  const [[user]] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);

  return user;
};

module.exports = selectUserById;
