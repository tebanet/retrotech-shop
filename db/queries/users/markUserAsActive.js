const getPool = require('../../getDB.js');

const markUserAsActive = async (id) => {
  const pool = await getPool();

  try {
    const [user] = await pool.query(
      'UPDATE users SET active = 1 WHERE id = ?',
      [id]
    );

    console.log('Usuario actualizado:', user);

    return user;
  } catch (error) {
    console.error('Error al actualizar el usuario:', error);
    throw error; // Lanza el error para que sea capturado en la función llamadora (validateUser).
  }
};

module.exports = markUserAsActive;
