const getPool = require('../../getDB.js');
const { generateError } = require('../../../helpers/generateError.js');

const getProductByiD = async (id) => {
    let connection; 

    try {
        connection = await getPool()

        const [result] = await connection.query(`
        SELECT * FROM product WHERE product_id= ?
        `, [id]);

        if(result.length === 0) {
            throw generateError(`o Produto com id=${id} não existe`, 404)
        }
        return result[0];
    } finally {
        if(connection) connection.release
    }
}

module.exports = { getProductByiD }