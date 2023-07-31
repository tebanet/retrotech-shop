const getPool = require('../../getDB');

const selectUserById = async (id) => {
  const pool = await getPool();

  await pool.query('USE retrotech_shop');

  const [[user]] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);

  return user;
};

module.exports = selectUserById;
