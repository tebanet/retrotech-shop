const getPool = require('../../getDB.js');
const { generateError } = require('../../../helpers/generateError.js');

const getProductByCategory = async (letter) => {
    let connection; 

    try {
        connection = await getPool()

        const [result] = await connection.query(`
        SELECT * FROM product WHERE category LIKE '${letter}%'
        `, [letter]);

        if(result.length === 0) {
            throw generateError(`Não existe nenhum produto com essa categoria`, 404)
        }
        return result;
    } finally {
        if(connection) connection.release
    }
}

module.exports = { getProductByCategory }