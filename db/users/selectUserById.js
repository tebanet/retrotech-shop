const getpool = require();

const selectUserById = async (id) => {
    const pool = await getpool();

    const [[user]] = await pool.query(
        "SELECT id, email, name, avatar, registrationDate FROM users WHERE id = ?",
    [id]
    );

    return user;
};

module.exports = selectUserById;