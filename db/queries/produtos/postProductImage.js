const getPool = require('../../getDB.js');

const addProductImage = async (resizedImage, product_id) => {
  try {
    const pool = await getPool();

    const [result] = await pool.query(
      `
      UPDATE product SET product_image = ?
      WHERE product_id = ?
    `,
      [resizedImage, product_id]
    );

    return result.affectedRows;
  } catch (error) {
    console.error('Error al modificar el usuario:', error);
    throw error;
  }
};

module.exports = addProductImage;
