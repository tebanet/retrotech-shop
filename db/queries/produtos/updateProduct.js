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

    if (
      product_title !== undefined &&
      product_title !== null &&
      product_title !== ''
    ) {
      setClauses.push('product_title = ?');
      values.push(product_title);
    }
    if (category !== undefined && category !== null && category !== '') {
      setClauses.push('category = ?');
      values.push(category);
    }
    if (price !== undefined && price !== null && price !== '') {
      setClauses.push('price = ?');
      values.push(price);
    }
    if (
      description !== undefined &&
      description !== null &&
      description !== ''
    ) {
      setClauses.push('description = ?');
      values.push(description);
    }
    if (
      place_of_sale !== undefined &&
      description !== null &&
      description !== ''
    ) {
      setClauses.push('place_of_sale = ?');
      values.push(place_of_sale);
    }
    if (location !== undefined && description !== null && description !== '') {
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
