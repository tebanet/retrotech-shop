const getPool = require('../../getDB.js');

const createProduct = async (product_title, product_image = '', category, description, price, status, place_of_sale, location, user_id) => {
    let connection;

  try {
    connection = await getPool();

        const [result] = await connection.query(`
        INSERT INTO product (product_title, product_image, category, price, description, status, place_of_sale, location, id_seller)
        VALUES (?,?,?,?,?,?,?,?,?)
        `,
        [product_title, product_image, category, description, price, status, place_of_sale, location, user_id]);

    return result.insertId;
  } finally {
    if (connection) connection.release;
  }
};

module.exports = { createProduct };
