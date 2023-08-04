const getPool = require('../../getDB.js');

const insertUser = async ({ email, password, username, registrationCode }) => {
  const pool = await getPool();

  const [{ insertID }] = await pool.query(
    `INSERT INTO users 
    (email, password, username, registrationCode) VALUES (?, ?, ?, ?)`,
    [email, password, username, registrationCode]
  );

  return insertID;
};

module.exports = insertUser;
