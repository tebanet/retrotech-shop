const getPool = require('../../getDB.js');

const insertUser = async ({ email, password, username }) => {
  const pool = await getPool();
  await pool.query('USE retrotech_shop');
  const [{ insertID }] = await pool.query(
    `INSERT INTO users 
    (email, password, username) VALUES (?, ?, ?)`,
    [email, password, username]
  );

  return insertID;
};

module.exports = { insertUser };
