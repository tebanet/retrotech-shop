const getPool = require('../../getDB');

const selectUserByEmail = async (email) => {
  const pool = await getPool();

  await pool.query('USE retrotech_shop');

  const [[user]] = await pool.query('SELECT * FROM users WHERE email = ?', [
    email,
  ]);

  return user;
};

module.exports = { selectUserByEmail };
