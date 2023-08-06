const bcrypt = require('bcrypt');
const updateUserSchema = require('../../schemas/users/updateUser.js');
const path = require('path');
const sharp = require('sharp');
const modifyUser = require('../../db/queries/users/modifyUser.js');
const selectUserById = require('../../db/queries/users/selectUserById.js');
const profilePicsPath = path.join(__dirname, '..', '..', 'profile_pics');

const updateUserProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const { email, username, password, bio, profile_pic, address } = req.body;

    await updateUserSchema.validateAsync(req.body);

    let hashedPassword;

    const user = await selectUserById(id);

    if ('username' in req.body) {
      user.username = req.body.username;
    }

    if ('email' in req.body) {
      user.email = req.body.email;
    }

    if ('bio' in req.body) {
      user.bio = req.body.bio;
    }

    if ('password' in req.body) {
      user.hashedPassword = await bcrypt.hash(req.body.password, 10);
    }

    if (req.files?.profile_pic) {
      const profilePicPath = path.join(profilePicsPath, `user${id}.jpg`);
      await sharp(req.files.profile_pic.data)
        .resize(200, 200)
        .toFile(profilePicPath);
      user.profile_pic = profilePicPath;
    }

    if ('address' in req.body) {
      user.address = req.body.address;
    }

    const rowsAffected = await modifyUser(
      id,
      user.email,
      user.username,
      user.hashedPassword,
      user.bio,
      user.profile_pic,
      user.address
    );

    if (rowsAffected === 0) {
      return res.status(500).json({ error: 'Failed to update user' });
    }
    return res.json(user);
  } catch (error) {
    console.error('Error al actualizar el perfil:', error);
    res
      .status(500)
      .json({ status: 'error', message: 'Error al actualizar el perfil.' });
  }
};

module.exports = updateUserProfile;
