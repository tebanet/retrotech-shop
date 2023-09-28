const getPool = require('../../getDB.js');

const getProductFiltered = async (queryParams) => {
  const pool = await getPool();
  const { title, min, max, location, category } = queryParams;

  let sqlQuery = 'SELECT * FROM product';
  const values = [];
  let clause = 'WHERE';

  if (title) {
    sqlQuery += ` ${clause} product_title LIKE ?`;
    values.push(`%${title}%`);
    clause = 'AND';
  }

  if (location) {
    sqlQuery += ` ${clause} location LIKE ?`;
    values.push(`%${location}%`);
    clause = 'AND';
  }

  if (category) {
    sqlQuery += ` ${clause} category LIKE ?`;
    values.push(`%${category}%`);
    clause = 'AND';
  }

  if (min) {
    sqlQuery += ` ${clause} price > ?`;
    values.push(min);
    clause = 'AND';
  }

  if (max) {
    sqlQuery += ` ${clause} price < ?`;
    values.push(max);
    clause = 'AND';
  }

  console.log(sqlQuery, values);

  const [products] = await pool.query(sqlQuery, values);
  return products;
};

module.exports = getProductFiltered;
