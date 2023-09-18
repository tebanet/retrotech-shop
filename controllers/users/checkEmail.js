const selectUserByEmail = require('../../db/queries/users/selectUserByEmail');

const checkEmail = async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await selectUserByEmail(email);

    if (user) {
      res
        .status(200)
        .json({ message: 'El correo electrónico existe en la base de datos.' });
    } else {
      res.status(404).json({
        message: 'El correo electrónico no existe en la base de datos.',
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = checkEmail;
