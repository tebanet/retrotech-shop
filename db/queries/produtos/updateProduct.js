const getPool = require('../../getDB.js');

const updateProduct = async (
  product_title,
  category,
  price,
  description,
  place_of_sale,
  location,
  product_id
) => {
  let connection;

  try {
    connection = await getPool();
    const setClauses = [];
    const values = [];

    if (product_title !== undefined) {
      setClauses.push('product_title = ?');
      values.push(product_title);
    }
    if (category !== undefined) {
      setClauses.push('category = ?');
      values.push(category);
    }
    if (price !== undefined) {
      setClauses.push('price = ?');
      values.push(price);
    }
    if (description !== undefined) {
      setClauses.push('description = ?');
      values.push(description);
    }
    if (place_of_sale !== undefined) {
      setClauses.push('place_of_sale = ?');
      values.push(place_of_sale);
    }
    if (location !== undefined) {
      setClauses.push('location = ?');
      values.push(location);
    }

    const sql = `
      UPDATE product 
      SET ${setClauses.join(', ')}
      WHERE product_id = ?
    `;

    values.push(product_id);

    const [{ result }] = await connection.query(sql, values);

    return result;
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    if (connection) connection.release;
  }
};

module.exports = { updateProduct };
