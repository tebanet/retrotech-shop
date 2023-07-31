const getPool = require('../../getDB');

const insertUser = async ({ email, password, username }) => {
  const pool = await getPool();

  const [{ insertID }] = await pool.query(
    `INSERT INTO users 
    (email, password, username) VALUES (?, ?, ?)`,
    [email, password, username]
  );

  return insertID;
};

module.exports = insertUser;
