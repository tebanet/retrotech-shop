const saveResetTokenToDatabase = require('../../db/queries/users/saveResetTokenToDatabate');
const selectUserByEmail = require('../../db/queries/users/selectUserByEmail');
const generateUniqueToken = require('../../helpers/generateUniqueToken');
const sendResetEmail = require('../../helpers/sendResetEmail');

const sendPasswordResetEmail = async (req, res, next) => {
  try {
    const recoveryToken = generateUniqueToken();

    const { email } = req.body;

    const user = await selectUserByEmail(email);
    await saveResetTokenToDatabase(user.id, recoveryToken);

    await sendResetEmail(email, recoveryToken);

    res.json({
      message:
        'El mensaje para recuperar la contraseña se ha enviado con éxito.',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = sendPasswordResetEmail;
