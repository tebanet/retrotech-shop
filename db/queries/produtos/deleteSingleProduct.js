const getPool = require('../../getDB.js');

const deleteProductByiD = async (id) => {
    let connection; 

    try {
        connection = await getPool()

        await connection.query(`
        DELETE FROM product WHERE product_id=?
        `, [id]);

        return
    } finally {
        if(connection) connection.release
    }
}

module.exports = {deleteProductByiD}