const markUserAsActive = require('../../db/queries/users/markUserAsActive.js');
const selectUserByRegistrationCode = require('../../db/queries/users/selectUserByRegistrationCode.js');

const validateUser = async (req, res) => {
  try {
    const { registrationCode } = req.params;

    // Buscar al usuario por el registrationCode en la base de datos
    const user = await selectUserByRegistrationCode(registrationCode);

    if (!user) {
      return res
        .status(404)
        .json({ status: 'error', message: 'Código de validación inválido.' });
    }

    // Actualizar el estado de validación del usuario en la base de datos
    await markUserAsActive(user.id);

    res
      .status(200)
      .json({ status: 'ok', message: 'Usuario validado correctamente.' });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error al procesar la validación del usuario.',
    });
  }
};

module.exports = validateUser;
