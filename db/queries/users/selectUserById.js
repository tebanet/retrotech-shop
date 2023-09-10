const getPool = require('../../getDB.js');

const selectUserById = async (id) => {
  const pool = await getPool();

  const [[user]] = await pool.query(
    'SELECT id, username, email, password, role, active, createdAt FROM users WHERE id = ?',
    [id]
  );

  return user;
};

module.exports = selectUserById;
