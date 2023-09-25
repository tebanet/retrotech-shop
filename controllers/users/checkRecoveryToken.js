const selectUserByRecoveryToken = require('../../db/queries/users/selectUserByRecoveryToken');

const checkRecoveryToken = async (req, res, next) => {
  try {
    const { token } = req.body;

    const user = await selectUserByRecoveryToken(token);

    if (user) {
      res.status(200).json({
        data: { user },
      });
    } else {
      res.status(404).json({
        message: 'El correo electrónico no existe en la base de datos.',
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = checkRecoveryToken;
