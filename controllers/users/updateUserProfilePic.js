const jwt = require('jsonwebtoken');
const modifyUserProfilePic = require('../../db/queries/users/modifyUserProfilePic');
const selectUserById = require('../../db/queries/users/selectUserById');
const path = require('path');
const sharp = require('sharp');

const HOST = process.env.HOST || 'http://localhost:3000';

async function updateUserProfilePic(req, res, next) {
  try {
    const token = req.headers.authorization;
    const decodedToken = await jwt.verify(token, process.env.SECRET);
    const userId = decodedToken.id;

    const directory = path.join(__dirname, '..', '..', 'profile_pics');
    const originalFileName = req.files.profile_pic.name;
    const extension = path.extname(originalFileName);
    const resizedImage = `Profile_Pic_${userId}${extension}`;
    const filePath = path.join(directory, resizedImage);

    if (req.files && req.files.image) {
      await sharp(req.files.profile_pic.data).resize(200, 200).toFile(filePath);
    }

    const picURL = `${HOST}/profile_pics/${resizedImage}`;
    console.log(picURL);
    // const user = await selectUserById(userId);

    const rowsAffected = await modifyUserProfilePic(userId, picURL);
    if (rowsAffected === 0) {
      return res
        .status(400)
        .json({ error: 'No hay ninguna imagen para actualizar' });
    }
    return res.json(userId);
  } catch (error) {
    next(error);
  }
}
module.exports = updateUserProfilePic;
