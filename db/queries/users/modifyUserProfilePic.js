const getPool = require('../../getDB.js');

const modifyUserProfilePic = async (userId, resizedImage) => {
  try {
    const pool = await getPool();

    const [result] = await pool.query(
      `
      UPDATE users SET profile_pic = ?
      WHERE id = ?
    `,
      [resizedImage, userId]
    );

    return result.affectedRows;
  } catch (error) {
    console.error('Error al modificar el usuario:', error);
    throw error;
  }
};

module.exports = modifyUserProfilePic;
