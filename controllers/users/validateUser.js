const markUserAsActive = require('../../db/queries/users/markUserAsActive.js');
const selectUserByRegistrationCode = require('../../db/queries/users/selectUserByRegistrationCode.js');

const validateUser = async (req, res) => {
  try {
    const { registrationCode } = req.params;

    const user = await selectUserByRegistrationCode(registrationCode);

    if (!user) {
      return res
        .status(404)
        .json({ status: 'error', message: 'Código de validación inválido.' });
    }

    await markUserAsActive(user.id);

    res
      .status(200)
      .json({ status: 'ok', message: 'Usuario validado correctamente.' });
  } catch (error) {
    console.error('Error al procesar la validación del usuario:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error al procesar la validación del usuario.',
    });
  }
};

module.exports = validateUser;
