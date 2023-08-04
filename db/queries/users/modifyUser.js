const getPool = require('../../getDB.js');

const modifyUser = async (id, email, username, password, bio, profile_pic) => {
  const pool = await getPool();

  const [result] = await pool.query(
    `
      UPDATE users SET email = ?, username = ?, password = ?, bio = ?, profile_pic = ?
      WHERE id = ?
    `,
    [email, username, password, bio, profile_pic, id]
  );

  return result.affectedRows; // Devuelve el número de filas afectadas por la actualización
};

module.exports = modifyUser;
