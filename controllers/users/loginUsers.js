const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const selectUserByEmail = require('../../db/queries/users/selectUserByEmail.js');
const { generateError } = require('../../helpers/generateError.js');
const loginUserSchema = require('../../schemas/users/loginUsers.js');

const loginUser = async (req, res, next) => {
  try {
    await loginUserSchema.validateAsync(req.body);

    const { email, password } = req.body;

    const userDB = await selectUserByEmail(email);

    if (!userDB) {
      throw generateError('El email o la contraseña son incorrectos', 400);
    }

    if (userDB.active !== 1) {
      throw generateError('El usuario no está activo', 400);
    }

    const isPasswordOk = await bcrypt.compare(password, userDB.password);

    if (!isPasswordOk) {
      throw generateError('El email o la contraseña son incorrectos', 400);
    }

    const { id, username } = userDB;

    const tokenPayLoad = { id, username, email };

    const expiresIn = '30d';

    const token = jwt.sign(tokenPayLoad, process.env.SECRET, { expiresIn });

    res.send({ status: 'ok', data: { tokenPayLoad, expiresIn }, token });
  } catch (error) {
    next(error);
  }
};

module.exports = loginUser;
