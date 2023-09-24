const saveResetTokenToDatabase = require('../../db/queries/users/saveResetTokenToDatabate');
const selectUserByEmail = require('../../db/queries/users/selectUserByEmail');
const generateUniqueToken = require('../../helpers/generateUniqueToken');
const sendResetEmail = require('../../helpers/sendResetEmail');

const sendPasswordResetEmail = async (req, res, next) => {
  try {
    const recoveryToken = generateUniqueToken();

    const { email } = req.body;

    const user = await selectUserByEmail(email);

    if (!user) {
      return res.status(400).json({
        message:
          'El correo electrónico no está registrado en nuestra base de datos.',
      });
    }

    await saveResetTokenToDatabase(user.id, recoveryToken);

    await sendResetEmail(email, recoveryToken);

    res.status(201).send({
      message:
        'El código para recuperar la contraseña se ha enviado con éxito.',
      status: 'ok',
      data: { email, recoveryToken },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = sendPasswordResetEmail;
