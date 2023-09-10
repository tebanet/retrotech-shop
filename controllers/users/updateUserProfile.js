const bcrypt = require('bcrypt');
const updateUserSchema = require('../../schemas/users/updateUser.js');
const path = require('path');
const sharp = require('sharp');
const modifyUser = require('../../db/queries/users/modifyUser.js');
const selectUserById = require('../../db/queries/users/selectUserById.js');
const profilePicsPath = path.join(__dirname, '..', '..', 'profile_pics');
const jwt = require('jsonwebtoken');

const updateUserProfile = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const decodedToken = jwt.verify(token, process.env.SECRET);
    const userId = decodedToken.id;

    await updateUserSchema.validateAsync(req.body);

    const user = await selectUserById(userId);

    const updatedUser = {
      ...user,
      ...(req.body.username && { username: req.body.username }),
      ...(req.body.email && { email: req.body.email }),
      ...(req.body.bio && { bio: req.body.bio }),
      ...(req.body.address && { address: req.body.address }),
    };
    console.log('req.body:', req.body);
    console.log('req.body.password:', req.body.password);
    console.log('user.password:', user.password);

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

    if (req.files?.profile_pic) {
      const originalFileName = req.files.profile_pic.name;
      const extension = path.extname(originalFileName);
      const profilePicPath = path.join(
        profilePicsPath,
        `Profile_Pic_${userId}.${extension}`
      );
      await sharp(req.files.profile_pic.data)
        .resize(200, 200)
        .toFile(profilePicPath);
      updatedUser.profile_pic = profilePicPath;
    }

    const rowsAffected = await modifyUser(
      userId,
      updatedUser.email,
      updatedUser.username,
      updatedUser.hashedPassword,
      updatedUser.bio,
      updatedUser.profile_pic,
      updatedUser.address
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

module.exports = updateUserProfile;
