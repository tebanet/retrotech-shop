const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { selectUserByEmail } = require('../../db/queries/users');
const { generateError } = require('../../helpers');
const { loginUserSchema } = require('../../schemas/users');

const loginUser = async (req, res, next) => {
  try {
    await loginUserSchema.validateAsync(req.body);

    const { email, password } = req.body;

    const userDB = await selectUserByEmail(email);

    if (!userDB) {
      generateError('El email o la contraseña son incorrectos', 400);
    }

    const isPasswordOk = await bcrypt.compare(password, userDB.password);

    if (!isPasswordOk) {
      generateError('El email o la contraseña son incorrectos', 400);
    }

    const { id, username } = userDB;

    const tokenPayLoad = { id, username, email };

    const expiresIn = '30d';

    jwt.sign(tokenPayLoad, process.env.SECRET, { expiresIn });

    res.send({ status: 'ok', data: { tokenPayLoad, expiresIn } });
  } catch (error) {
    next(error);
  }
};

module.exports = loginUser;
