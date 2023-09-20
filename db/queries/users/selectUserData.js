const getPool = require('../../getDB.js');
const { generateError } = require('../../../helpers/generateError.js');

const selectUserData = async (username) => {
  const pool = await getPool();

  const [user] = await pool.query(
    `SELECT
    username,
    email,
    profile_pic,
    bio,
    createdAt,
    ROUND(AVG(valoracion), 1) AS media_valoracion
FROM
    users
LEFT JOIN
    valoraciones ON
    users.id = valoraciones.id_seller
WHERE
    users.username = ?
`,
    [username]
  );

  console.log(user[0]);

  if (user[0].username === null) {
    throw generateError(`El usuario ${username} no existe`, 404);
  }

  return user[0];
};

module.exports = selectUserData;
