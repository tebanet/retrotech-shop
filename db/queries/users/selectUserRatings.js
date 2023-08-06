const getPool = require('../../getDB.js');
const { generateError } = require('../../../helpers/generateError.js');

const selectUserRatings = async (username) => {
  const pool = await getPool();

  // producto vendido, valoracion, mensaje, nombre de comprador, fecha

  const [ratings] = await pool.query(
    `SELECT 
    product.product_title, 
    (
      SELECT 
        users.username 
      FROM 
        users 
      WHERE 
        users.id = valoraciones.id_buyer
    ) AS comprador, 
    valoraciones.valoracion, 
    valoraciones.comentaries, 
    valoraciones.valoracion_date 
  FROM 
    valoraciones 
    INNER JOIN users ON valoraciones.id_seller = users.id 
    INNER JOIN product ON valoraciones.id_product = product.product_id 
  WHERE 
    users.username = ?;
    
`,
    [username]
  );

  if (ratings.length === 0) {
    throw generateError(`El usuario ${username} no tiene valoraciones`, 404);
  }

  return ratings;
};

module.exports = selectUserRatings;
