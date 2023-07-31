const getPool = require("");

const insertUsers = async ({email, password, name}) => {
    const pool = await getPool();

    const [posts] = await pool.query(`INSERT INTO users 
    ( email, password, name) VALUES ("nadia@email.com", "1234", "Nadia")`);

    return posts;
};

module.exports = insertUsers;