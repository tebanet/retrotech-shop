const getPool = require('../../getDB.js');

const addProductImage = async (userId, resizedImage) => {
  try {
    const pool = await getPool();

    const [result] = await pool.query(
      `
      UPDATE products SET product_image = ?
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

module.exports = addProductImage;
