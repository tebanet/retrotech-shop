const deleteResetTokenFromDatabase = require('../../db/queries/users/deleteResetTokenFromDatabase');
const insertNewPassword = require('../../db/queries/users/insertNewPassword');
const selectUserByRecoveryToken = require('../../db/queries/users/selectUserByRecoveryToken');
const bcrypt = require('bcrypt');
const newPasswordSchema = require('../../schemas/users/newPasswordSchema');

const changePassword = async (req, res, next) => {
  try {
    const { token, newPassword, repeatPassword } = req.body;

    const user = await selectUserByRecoveryToken(token);

    if (!user) {
      return res
        .status(400)
        .json({ message: 'El token es inválido o ha expirado.' });
    }

    if (newPassword !== repeatPassword) {
      return res.status(400).json({ message: 'Las contraseñas no coinciden.' });
    }

    await newPasswordSchema.validateAsync(req.body);

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await insertNewPassword(user.id, hashedPassword);

    await deleteResetTokenFromDatabase(user.id, token);

    res.json({ message: 'La constraseña se ha cambiado con éxito.' });
  } catch (error) {
    next(error);
  }
};

module.exports = changePassword;
