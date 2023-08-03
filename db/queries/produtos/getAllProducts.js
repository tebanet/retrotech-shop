const getPool = require('../../getDB.js');

const getAllProducts = async () => {
    let connection; 

    try {
        connection = await getPool()

        const [result] = await connection.query(`
        SELECT * FROM product ORDER BY createdAt DESC`);

        return result;
    } finally {
        if(connection) connection.release
    }
}

module.exports = { getAllProducts }