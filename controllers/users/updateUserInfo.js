const bcrypt = require('bcrypt');
const updateUserSchema = require('../../schemas/users/updateUser.js');
const modifyUserInfo = require('../../db/queries/users/modifyUserInfo.js');
const selectUserById = require('../../db/queries/users/selectUserById.js');
const jwt = require('jsonwebtoken');

const updateUserInfo = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const decodedToken = jwt.verify(token, process.env.SECRET);
    const userId = decodedToken.id;

    await updateUserSchema.validateAsync(req.body);

    const user = await selectUserById(userId);

    const updatedUser = {
      ...(req.body.email && { email: req.body.email }),
      ...(req.body.username && { username: req.body.username }),
      ...(req.body.bio && { bio: req.body.bio }),
      ...(req.body.address && { address: req.body.address }),
      ...user,
    };

    if ('password' in req.body) {
      const isPasswordValid = await bcrypt.compare(
        req.body.password,
        user.password
      );

      if (!isPasswordValid) {
        return res.status(401).json({ error: 'La contraseña es incorrecta' });
      }
    } else {
      return res.status(400).json({ error: 'La contraseña es obligatoria' });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const rowsAffected = await modifyUserInfo(
      updatedUser.email,
      updatedUser.username,
      updatedUser.bio,
      updatedUser.address,
      (updatedUser.password = hashedPassword),
      userId
    );

    if (rowsAffected === 0) {
      return res
        .status(400)
        .json({ error: 'No hay ningún dato para actualizar' });
    }
    return res.json(updatedUser);
  } catch (error) {
    next(error);
  }
};

module.exports = updateUserInfo;
