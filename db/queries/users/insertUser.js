const getPool = require('../../getDB.js');

const insertUser = async ({
  id,
  email,
  password,
  username,
  registrationCode,
}) => {
  try {
    const pool = await getPool();

    const [{ insertID }] = await pool.query(
      `INSERT INTO users 
    (id, email, password, username, registrationCode) VALUES (?, ?, ?, ?, ?)`,
      [id, email, password, username, registrationCode]
    );

    return insertID;
  } catch (error) {
    console.error('Error al crear el usuario:', error);
    throw error;
  }
};

module.exports = insertUser;
